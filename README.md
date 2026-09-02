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
| `/resume-recruiter/` | Peregrine Headhunter recruit intake form (moved from `ivanadiaz.com/peregrine-recruit/`). Submits to the live `database2-api` Cloud Run API; requires that API's CORS allowlist to include `https://peregrin3.com` (see `ideeazz1/database2-api` PR `cursor/peregrin3-cors-origin-109d`) |

## Notes for future edits

- `/process/` and `/pulse/` still show a "Concept archive" banner — left as-is per Ivan's instruction; not the current Peregrine offer.
- The `dmdickason*` pages originally included a client-side login gate (`/private/site-gate.js`) — intentionally removed here since these are meant to be openly viewable via unlisted link, not login-gated. `noindex, nofollow` meta tags were kept.
- `resume-recruiter/recruit.js` deliberately ignores the backend's `confirmationPage` field and always redirects to a same-directory relative `thanks.html` — the backend's value is an absolute path tied to the old `ivanadiaz.com/peregrine-recruit` location.
- `config/plausible.js` is a domain-specific copy of the one in `ivanAdiaz-site` (`data-domain` changed to `peregrin3.com`) — keep them in sync manually if the loader logic changes upstream.

## Still needed (not done by an agent)

1. Enable GitHub Pages (Settings → Pages), source = `main` branch, root, custom domain `peregrin3.com`.
2. GoDaddy DNS: switch from domain forwarding to real records — apex `A` → GitHub Pages IPs (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`), `www` → `CNAME` to `ideeazz1.github.io.`.
3. Merge/deploy the `database2-api` CORS PR so `/resume-recruiter` submissions actually work cross-origin.
