# Responsive Verification Matrix

Record actual results; do not mark a condition passed without checking the rendered interface.

| Condition | Width / mode | Expected behavior | Result / evidence |
|---|---|---|---|
| Narrow viewport | 320 CSS px | No unintended page-level horizontal scroll; content and actions remain available | |
| Mobile viewport | Product-relevant narrow width | Touch, keyboard and virtual keyboard do not obscure tasks | |
| Tablet / split view | Content-driven width | Navigation and component layouts adapt without clipping | |
| Desktop | Product-relevant wide width | Text measure and content density remain usable | |
| Zoom / reflow | 400% where applicable | Content reflows; exceptions are limited to essential two-dimensional content | |
| Text stress | Long labels, URLs, translations, errors | No overlap, clipping or lost actions | |
| Orientation | Portrait and landscape where relevant | Layout remains usable after rotation | |
| Input modes | Keyboard, touch, pointer | No hover-only actions; focus remains visible and ordered | |
| Overlays | Sticky bars, dialogs, virtual keyboard | Focused and essential content is not obscured | |
| Preferences | Reduced motion, forced colors | State and focus remain perceivable | |

## Exceptions

Document any intentional two-dimensional region, why it is necessary and how users operate it on narrow screens.
