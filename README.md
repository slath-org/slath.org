<!-- SPDX-FileCopyrightText: 2026 Erich Seifert <dev@erichseifert.de> -->
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->
# slath.org

Source of <https://slath.org>, the website of [Slath](https://github.com/slath-org/slath),
a self-hosted code forge for Git and Jujutsu.

It's plain static HTML and CSS with no build step and no third-party resources.
The only script is `assets/theme.js`, the light/dark theme switcher. The design
follows Slath's Weave design system: warm-neutral tokens, Source Sans 3 and
JetBrains Mono (bundled as WOFF2), and Lucide icons in a local sprite.

## Preview locally

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Layout

| Path | Contents |
|---|---|
| `index.html` | Landing page |
| `404.html` | Not-found page (uses absolute asset paths) |
| `assets/site.css` | Design tokens (light and dark) and components |
| `assets/theme.js` | Theme switcher (system, light, dark), stored in `localStorage` |
| `assets/icons.svg` | Lucide icon sprite |
| `assets/fonts/` | Self-hosted fonts (Latin subset, variable weight) |
| `CNAME`, `.nojekyll` | GitHub Pages configuration |

## License

Site content and code: [CC-BY-SA-4.0](LICENSES/CC-BY-SA-4.0.txt). Fonts and icons
keep their own licenses, see [LICENSES/](LICENSES/README.md).
