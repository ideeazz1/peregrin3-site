# peregrin3-site

Public GitHub Pages source for **peregrin3.com** — the Peregrine consulting brand
domain, separate from Ivan's personal site (`ivanadiaz.com`, repo
`ideeazz1/ivanAdiaz-site`) and separate from the private consulting-brain repo
(`ideeazz1/peregrin3`, not public).

## Status (2026-09-02)

No dedicated Peregrine homepage yet. Root `/` redirects to `https://ivanadiaz.com/`.

## Live paths

| Path | Content |
|---|---|
| `/` | Redirect to `ivanadiaz.com` (no Peregrine homepage yet) |
| `/process/` | Peregrine method / five-stage process page (concept archive, moved from `ivanadiaz.com/peregrin3/process/`) |
| `/pulse/` | Peregrine platform hypothesis page (concept archive, moved from `ivanadiaz.com/peregrin3/pulse/`) |
| `/dmdickason/`, `/dmdickason2/`, `/dmdickason-observation/` | Client research/proposal pages for dmDickason Personnel Services — unlisted (`noindex`), open to anyone with the link, no login gate |
| `/jobswoop/` | JobSwoop full-time and internship intake. Existing `database2-api` integration, fields, verification, and user data are preserved. |
| `/resume-recruiter/` | Legacy entry forwards to `/jobswoop/`, preserving query parameters and fragments. Legacy `thanks.html` forwards to the corresponding new confirmation page. |

## Notes for future edits

- `/process/` and `/pulse/` still show a "Concept archive" banner — left as-is per Ivan's instruction; not the current Peregrine offer.
- The `dmdickason*` pages originally included a client-side login gate (`/private/site-gate.js`) — intentionally removed here since these are meant to be openly viewable via unlisted link, not login-gated. `noindex, nofollow` meta tags were kept.
- `jobswoop/recruit.js` deliberately ignores the backend's `confirmationPage` field and redirects to `/jobswoop/thanks.html` — the backend's value is tied to the old `ivanadiaz.com/peregrine-recruit` location. The legacy script remains available for cached pages.
- `config/plausible.js` is a domain-specific copy of the one in `ivanAdiaz-site` (`data-domain` changed to `peregrin3.com`) — keep them in sync manually if the loader logic changes upstream.

## JobSwoop migration — 2026-11-15

- JobSwoop is the primary brand; Peregrin3 is a subtle attribution. Shared styling covers intake and confirmation. The social preview and canonical URL point to the new location.
- Hosting and the backend are unchanged. Live API challenge/CORS checks accept `https://peregrin3.com`.
- **Redirect limitation:** GitHub Pages serves the old HTML with HTTP 200. Its script uses `location.replace` to automatically forward visitors, preserving query strings and anchors. This is **not an HTTP 301**. A server/proxy rule is needed for the requested true 301; do not claim this requirement is complete. No DNS/hosting migration or new paid service was introduced.
- Existing Pages automatically normalizes `/jobswoop` to `/jobswoop/`; that trailing-slash redirect is separate from the unresolved old-to-new HTTP 301.
- Browser verification covers both tracks, required fields, upload size validation, payloads and confirmation routing, recoverable API errors, legacy query/anchor links, and 320px/390px mobile layouts. Submission responses are mocked to avoid creating applicant records or sending emails. Downstream job matching and delivery were not triggered by these checks.
