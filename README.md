# Dr. Micha Fischer - Statistical Consulting

Website for the freelance statistical consulting practice of Dr. Micha Fischer.

The company name is **Dr. Micha Fischer - Statistical Consulting**. It is a
business name, so it is never translated — it reads identically in the English
and German versions and carries no `lang` attribute.

Static HTML, no build step, no dependencies. Open `index.html` in a browser to
preview; GitHub Pages serves the files as-is.

| Path | Purpose |
| --- | --- |
| `index.html` | The site — one page, bilingual EN/DE |
| `impressum.html` | Legal notice, bilingual. German is authoritative and is the default without JavaScript. |
| `datenschutz.html` | Privacy policy, bilingual. German text from the eRecht24 generator; the English one is a translation. German is the default without JavaScript. |
| `assets/css/site.css` | Shared stylesheet for all pages |
| `assets/js/lang.js` | Language switching |
| `assets/fonts/` | Self-hosted Inter + Source Serif 4 (SIL OFL 1.1) |

## Languages

Translated copy is marked with `lang="en"` / `lang="de"` directly in the markup.
The stylesheet hides whichever locale is inactive, and `assets/js/lang.js` flips
a `data-locale` attribute on `<html>`. To add or change text, edit both language
variants next to each other in `index.html`.

Locale is chosen by: explicit choice (remembered in `localStorage`) → browser
language → English. Without JavaScript the page stays in English and is fully
readable.

## No third-party requests

Fonts are self-hosted deliberately. Loading them from Google Fonts transmits
every visitor's IP address to Google, which German courts have treated as a
GDPR violation (LG München I, 20.01.2022, 3 O 17493/20). Please keep it that
way: no CDN links, no embedded analytics, maps, or hosted widgets.
