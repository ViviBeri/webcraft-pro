# Semantic Accessibility Review Checklist

Review the rendered interface and its source. Prefer native HTML semantics; ARIA supplements native behavior and does not create keyboard interaction by itself.

## Document structure and landmarks

- [ ] The document declares the correct language; language changes within content are identified.
- [ ] The page has a descriptive, unique title that reflects its purpose or state.
- [ ] A clear primary heading exists; heading levels express a meaningful hierarchy without using headings only for visual styling.
- [ ] Header, navigation, main and footer landmarks are used appropriately; repeated landmark instances have distinguishable names.
- [ ] Main content can be reached through a visible-on-focus skip link where appropriate.
- [ ] Content order in the DOM matches the intended reading and interaction order.
- [ ] Lists, tables, quotations and other structured content use the appropriate native elements.

## Names, roles, states and relationships

- [ ] Every interactive control has a programmatic name matching or containing its visible label.
- [ ] Inputs have persistent labels; placeholder text is not the sole label.
- [ ] Required, invalid, disabled, expanded, selected and pressed states are exposed correctly.
- [ ] Instructions and errors are programmatically associated with their controls.
- [ ] Icon-only controls have an accessible name and decorative icons are hidden from assistive technology.
- [ ] Custom widgets use an appropriate role only when native HTML cannot express the interaction.
- [ ] ARIA references resolve to unique, existing elements; no redundant or conflicting roles/states are present.
- [ ] Composite widgets implement the expected keyboard model and focus management, not just ARIA attributes.

## Images, media and non-text content

- [ ] Informative images have concise purpose-based text alternatives.
- [ ] Decorative images are ignored by assistive technology.
- [ ] Complex images have an adjacent or linked text equivalent with the necessary data or conclusions.
- [ ] Captions, transcripts and audio descriptions are provided when required for the media and audience.
- [ ] Background images do not carry essential information without an equivalent.

## Forms, validation and dynamic content

- [ ] Each field has a visible label and any format or constraint is explained before submission.
- [ ] Error messages identify the field and explain how to correct the problem.
- [ ] Error summary and inline errors are discoverable and associated with affected fields.
- [ ] Success, loading and asynchronous updates are communicated without unnecessarily moving focus.
- [ ] Status messages use suitable live-region semantics; announcements are concise and not duplicated.
- [ ] Destructive or consequential actions are clearly identified and have an appropriate confirmation or recovery path.

## Visual and responsive semantics

- [ ] Information is not conveyed by color, shape, position or sound alone.
- [ ] Text and controls meet applicable contrast requirements in every relevant state.
- [ ] Content remains usable at text resize and browser zoom; no essential content or functionality is clipped.
- [ ] Focus indicators are visible, sufficiently distinct and not obscured by sticky content.
- [ ] Motion and animation respect reduced-motion preferences where appropriate.

## Review record

| Page / component | Reviewer | Issues found | Evidence |
|---|---|---|---|
| `[name]` | `[name]` | `[finding IDs or none]` | `[link]` |

**Important:** A checked item means it was reviewed for the sampled scope, not that the entire product is certified conformant.
