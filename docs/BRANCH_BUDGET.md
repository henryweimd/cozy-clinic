# Branch budget

Arcs cost authored nodes. This doc caps trajectory size per
patient so branching stories stay shippable. Held by the
`branch budget` test in `src/data/fallbackPack.test.ts` —
an export that breaks these caps fails the suite.

## Caps (per patient)

* Nodes: at most 64.
* Edges: at most 64.
* Depth: at most 4.

Current pack (2026-11-01): 36 patients x 17 nodes
(1 root + 4 + 12), 16 edges each, max depth 2.

## Depth target

Arc conditions need depth 3 or more before multi-visit
arcs can run multiple visits deep. The content pipeline
(H2 seed driver + exporter) owns adding that layer. Until
it lands, the resume mechanism restarts finished leaves
at the root — verified across visits, bounded by depth 2.

## Changing the budget

Raise a cap only with a node count from a real export and
a reviewer nod. Never raise depth past 4 without a
loading-time check on a low-end phone (the cast loads at
boot; the demo must stay instant).
