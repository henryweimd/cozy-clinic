"""Rev-2 mascot pipeline reimplementation (from art/manifest.json alpha spec).

Recipe: border flood-fill keyout thresh=32 from 8 edge seeds on the
1600x1600 master + binary-opening despeckle; edge-band-only despill
(<=2px of transparent); NO interior despill; shadow-ectomy below
y=1350 keeps foot-fur only; LANCZOS to shared union window
(246,112,1353,1476 master px), scale-to-height-176, bottom row 184,
centered-x; corners alpha 0.
"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

UNION = (246, 112, 1353, 1476)  # left, top, right, bottom (master px)
KEY_THRESH = 32
SHADOW_Y = 1350
SHADOW_KEEP_DIST = 64
OUT_H = 176
OUT_BOTTOM = 184  # exclusive bottom row in 192px export
SIZE = 192


def keyout(master_path):
    im = Image.open(master_path).convert("RGB")
    a = np.asarray(im).astype(np.int16)
    h, w, _ = a.shape
    assert (w, h) == (1600, 1600), (w, h)
    border = np.concatenate([
        a[:10, :, :].reshape(-1, 3), a[-10:, :, :].reshape(-1, 3),
        a[:, :10, :].reshape(-1, 3), a[:, -10:, :].reshape(-1, 3),
    ])
    bg = np.median(border, axis=0)
    dist = np.sqrt(((a - bg) ** 2).sum(axis=2))
    cand = dist <= KEY_THRESH
    # keep only bg-candidates connected to the border (8 edge seeds:
    # 4 corners + 4 edge midpoints)
    lab, n = ndimage.label(cand, structure=np.ones((3, 3), int))
    seeds = [(0, 0), (0, w - 1), (h - 1, 0), (h - 1, w - 1),
             (0, w // 2), (h - 1, w // 2), (h // 2, 0), (h // 2, w - 1)]
    keep = {lab[y, x] for (y, x) in seeds} - {0}
    transparent = np.isin(lab, list(keep))
    opaque = ~transparent
    # binary-opening despeckle
    opaque = ndimage.binary_opening(opaque, structure=np.ones((3, 3), int))
    # shadow-ectomy below y=1350: keep foot-fur only (fur dist >> shadow dist)
    below = np.zeros_like(opaque)
    below[SHADOW_Y:, :] = True
    opaque = opaque & (~below | (dist > SHADOW_KEEP_DIST))
    # edge-band-only despill: opaque px within <=2px of transparent get a
    # gentle push away from bg (20%); NO interior despill
    dt = ndimage.distance_transform_edt(opaque)
    band = opaque & (dt <= 2.0)
    rgb = np.asarray(im).astype(np.float32)
    pushed = rgb + (rgb - bg) * 0.20
    rgb[band] = np.clip(pushed[band], 0, 255)
    rgba = np.dstack([rgb, np.where(opaque, 255, 0)]).astype(np.uint8)
    return Image.fromarray(rgba, "RGBA"), tuple(int(v) for v in bg)


def export(rgba, paste_x):
    crop = rgba.crop(UNION)
    uw, uh = crop.size
    scale = OUT_H / uh
    nw = int(round(uw * scale))
    small = crop.resize((nw, OUT_H), Image.LANCZOS)
    out = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    out.paste(small, (paste_x, OUT_BOTTOM - OUT_H), small)
    return out


def metrics(png_path):
    im = Image.open(png_path).convert("RGBA")
    a = np.asarray(im)
    al = a[:, :, 3]
    oq = al >= 128
    ys, xs = np.nonzero(oq)
    bbox_excl = (int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1)
    return {
        "size": im.size,
        "bbox_excl": bbox_excl,
        "opaque_ratio": float(oq.mean()),
        "corners": [int(al[0, 0]), int(al[0, -1]), int(al[-1, 0]), int(al[-1, -1])],
    }


def edge_jumps(png_path):
    """Right-silhouette stair metric: per-row rightmost opaque col (alpha>=128),
    |dx| histogram between consecutive rows."""
    im = Image.open(png_path).convert("RGBA")
    al = np.asarray(im)[:, :, 3] >= 128
    right = []
    for row in al:
        idx = np.nonzero(row)[0]
        right.append(int(idx.max()) if len(idx) else None)
    seq = [v for v in right if v is not None]
    dx = [abs(b - a) for a, b in zip(seq, seq[1:])]
    return {
        "j0": sum(1 for d in dx if d == 0),
        "j1": sum(1 for d in dx if d == 1),
        "j2": sum(1 for d in dx if d == 2),
        "j3p": sum(1 for d in dx if d >= 3),
        "max": max(dx) if dx else 0,
    }


CONSOLE = """
Population mixing console. New patient, end to end:

  1. Generate the idle master: an identity EDIT of the nearest
     shipped master (same body plan, new fur shade + accessory).
     Block C verbatim + the bible identity row. 1600x1600.
  2. If headgear pokes above UNION top (y<112): deterministic
     0.88 rescale into a warm-white canvas (see rescale_master).
  3. python3 art/process_character.py calibrate <slug>
     (paste_x sweep; pick the x that centers the bbox on 96).
  4. Record the slug in CHARACTERS below; measure the foot mask
     from the feet-zone profile; set cap_restore for white hats.
  5. Generate the 5 expression edits from the idle master.
  6. python3 art/process_character.py process <slug> <frame>
     (x6) then contact <slug>; review the sheet.
  7. python3 art/process_character.py validate <slug>
     (UNION containment, idle-drift, corners, edge jumps,
     interior holes vs the shipped baseline).
  8. Wire the roster (sprites.ts, mockData, preload is derived),
     DB shades both sources, bible row, auditor ROSTER_PREFIX.

Deps: Pillow, numpy, scipy. Masters live in art/source/ (gitignored);
exports go to public/assets/characters/.
"""


def rescale_master(src_path, dst_path, scale=0.88, canvas_rgb=(239, 232, 222)):
    """Deterministic shrink for headgear clearance (Ellis recipe)."""
    v1 = Image.open(src_path).convert("RGB")
    assert v1.size == (1600, 1600), v1.size
    small_px = int(round(1600 * scale))
    small = v1.resize((small_px, small_px), Image.LANCZOS)
    canvas = Image.new("RGB", (1600, 1600), canvas_rgb)
    off = (1600 - small_px) // 2
    canvas.paste(small, (off, off))
    canvas.save(dst_path)
    return dst_path


# Per-character console settings. feet = ([(lo, hi), ...], shelf_top_y,
# foot_bottom_y); cap = (y0, y1, x0, x1, min_channel, max_spread) or None.
CHARACTERS = {
    "theo": {
        "paste_x": 22,
        "feet": ([(450, 690), (870, 1110)], 1395, 1432),
        "cap": None,
    },
    "priya": {
        "paste_x": 24,
        "feet": ([(460, 690), (850, 1090)], 1430, 1458),
        "cap": None,
    },
    "ellis": {
        "paste_x": 22,
        "feet": ([(450, 690), (870, 1110)], 1395, 1432),
        "cap": (100, 520, 450, 950, 232, 16),
    },
}

FRAMES = ("idle", "blink", "happy", "sick", "pained", "relieved")


def clean_feet(rgba, slug):
    (cols, shelf_top, foot_bot) = CHARACTERS[slug]["feet"]
    a = np.array(rgba)
    al = a[:, :, 3]
    w = al.shape[1]
    xs = np.arange(w)
    in_feet = np.zeros(w, bool)
    for lo, hi in cols:
        in_feet |= (xs >= lo) & (xs <= hi)
    band = np.zeros_like(al, bool)
    band[shelf_top:, :] = ~in_feet[None, :]
    band[foot_bot:, :] = True
    al[band] = 0
    a[:, :, 3] = al
    return Image.fromarray(a, "RGBA")


def restore_cap(rgba, slug, name):
    """White headgear keys out with the void; bright neutral pixels
    in the cap zone are cap, not bg. Ellis recipe, generalized."""
    spec = CHARACTERS[slug]["cap"]
    if spec is None:
        return rgba
    y0, y1, x0, x1, min_ch, max_spread = spec
    master = np.asarray(
        Image.open(f"art/source/{slug}/{slug}-{name}-master.png").convert("RGB")
    ).astype(int)
    zone = master[y0:y1, x0:x1]
    core = (zone.min(axis=2) > min_ch) & (zone.max(axis=2) - zone.min(axis=2) < max_spread)
    core = ndimage.binary_dilation(core, iterations=2)
    a = np.array(rgba)
    sub = a[y0:y1, x0:x1]
    sub[core] = np.dstack([zone, np.full(zone.shape[:2], 255)])[core]
    a[y0:y1, x0:x1] = sub
    return Image.fromarray(a, "RGBA")


def process_frame(slug, name):
    rgba, bg = keyout(f"art/source/{slug}/{slug}-{name}-master.png")
    out = export(clean_feet(restore_cap(rgba, slug, name), slug), CHARACTERS[slug]["paste_x"])
    p = f"public/assets/characters/{slug}-{name}.png"
    out.save(p)
    m, j = metrics(p), edge_jumps(p)
    print(slug, name, "bg:", bg, m, j)
    return m


def interior_holes(png_path):
    a = np.asarray(Image.open(png_path).convert("RGBA"))[:, :, 3] < 128
    lab, nlab = ndimage.label(a, structure=np.ones((3, 3), int))
    border_ids = set(np.unique(np.concatenate([lab[0, :], lab[-1, :], lab[:, 0], lab[:, -1]])))
    return int(sum((lab == i).sum() for i in range(1, nlab + 1) if i not in border_ids))


if __name__ == "__main__":
    mode = sys.argv[1]
    if mode == "calibrate":
        slug = sys.argv[2]
        rgba, bg = keyout(f"art/source/{slug}/{slug}-idle-master.png")
        print("bg median:", bg)
        a = np.asarray(rgba)
        ys, xs = np.nonzero(a[:, :, 3] > 128)
        print("keyed bbox:", (int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())),
              "UNION:", UNION)
        for px in (20, 22, 24, 26, 28):
            out = export(rgba, px)
            out.save(f"/tmp/{slug}-calib-x{px}.png")
            m = metrics(f"/tmp/{slug}-calib-x{px}.png")
            print(f"paste_x={px}:", m["bbox_excl"], round(m["opaque_ratio"], 4), m["corners"])
    elif mode == "process":
        process_frame(sys.argv[2], sys.argv[3])
    elif mode == "contact":
        slug = sys.argv[2]
        sheet = Image.new("RGB", (192 * 3, 192 * 2), (240, 230, 220))
        for i, n in enumerate(FRAMES):
            im = Image.open(f"public/assets/characters/{slug}-{n}.png")
            sheet.paste(im, ((i % 3) * 192, (i // 3) * 192), im)
        sheet = sheet.resize((576 * 2, 384 * 2), Image.NEAREST)
        sheet.save(f"art/contact-sheets/plate-{slug}.png")
        print("saved", f"art/contact-sheets/plate-{slug}.png")
    elif mode == "validate":
        slug = sys.argv[2]
        idle = metrics(f"public/assets/characters/{slug}-idle.png")
        print("idle:", idle["bbox_excl"], idle["corners"])
        ok = True
        for n in FRAMES:
            p = f"public/assets/characters/{slug}-{n}.png"
            m, j = metrics(p), edge_jumps(p)
            drift = max(abs(a - b) for a, b in zip(m["bbox_excl"], idle["bbox_excl"]))
            holes = interior_holes(p)
            line = f"{n}: drift={drift} corners={m['corners']} jumps={j} holes={holes}"
            print(("PASS " if drift <= 4 and m["corners"] == [0, 0, 0, 0] and holes <= 160 else "FAIL ") + line)
            ok = ok and drift <= 4 and m["corners"] == [0, 0, 0, 0] and holes <= 160
        print("VALIDATE:", "PASS" if ok else "FAIL")
    else:
        print(CONSOLE)
