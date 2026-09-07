# Donatas Paulauskas — Portfolio

A responsive, multilingual portfolio for business analytics and workflow automation.

## Update the portfolio

- Edit copy, project details and image references in `scripts/portfolio-content.mjs`.
- Edit layouts in `scripts/build-portfolio.mjs`.
- Edit the visual system in `assets/css/portfolio.css`.
- Edit progressive interactions in `assets/js/portfolio.js`.
- Run `npm run build` after changing content or layouts. No packages need to be installed.

The build writes the English pages at the repository root, Lithuanian pages under `lt/`, and Dutch pages under `nl/`. It also creates the deployable `dist/` directory containing only referenced assets. Commit the generated HTML when updating GitHub Pages.

## Hosting

The original `CNAME` is preserved for GitHub Pages. A separate private review copy can be hosted through Sites. Changes must be reviewed and merged before they reach the original domain.

## Behaviour

Content, links and language navigation work without JavaScript. JavaScript adds project filters, mobile menu controls, image enlargement and inline contact-form feedback. Images load lazily below the initial viewport, animation respects reduced-motion preferences, and forms use native validation with associated labels.

The contact form retains the original Make.com webhook and the `name`, `email`, `subject` and `message` fields. It accepts explicit `OK`, `Accepted`, `Success`, or a JSON success response. Unconfirmed submissions retain the visitor’s message and offer direct email as a fallback. Live delivery must be checked by the site owner; automated validation never sends test messages to the webhook.

## Project sources

The flight, sales and SQL case studies are based on their linked GitHub repositories. Analytical results are presented as portfolio findings rather than improvements achieved for a client. The original portfolio image assets are reused. Legacy template URLs are retained or redirected to relevant sections.
