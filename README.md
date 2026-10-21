# jonathandevito.com (preview)
Static site. After any change run `node build.js`, then redeploy.
- Photos: drop .jpg/.png/.webp into `photos/` (sorted by filename, e.g. 02-trail.jpg).
- Projects: copy `projects/_template.json` to `projects/my-project.json`, fill it in. Files starting with `_` are ignored. Optional page: add `projects/my-project.html` and set "link".
- Edit page text in build.js; styles in style.css.
