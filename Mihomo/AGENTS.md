# Repository Guidelines

## Project Structure & Module Organization
The repository is intentionally small: `override.js` (Mihomo Party/SubStore override script) and `Dler-2in1_0915.conf` (Surge/Mihomo baseline). The script exposes a `main(config)` entrypoint consumed by Mihomo Party; keep helpers near the top-level constants they rely on. Place any additional rulesets under `ruleset/<Vendor>/...` to match existing paths referenced in `ruleProviders`. If you add sample inputs or temporary tooling, store them under a new `tools/` or `samples/` directory and reference them here.

## Build, Test, and Development Commands
- `node -e "require('./override.js')"`: quick syntax/typo check; fails fast if the file cannot be parsed.
- `node tools/smoke.js` (create it alongside new features): load a captured base config and print the result of `main(config)` for local validation before syncing to SubStore.
- `mihomo -d . -f Dler-2in1_0915.conf --test` (when Mihomo CLI is available): confirms the base profile still boots.

## Coding Style & Naming Conventions
Use two-space indentation and trailing commas in object literals, mirroring the current style. Keep constant names in `camelCase`, proxy group labels exactly as rendered in clients, and configuration keys in the wire format Mihomo expects (for example `'proxy-groups'`). Run `npx prettier --check override.js Dler-2in1_0915.conf` before pushing; align any new lists with existing ordering (general-purpose groups first, niche filters later).

## Testing Guidelines
Validate behavioural changes against a real subscription whenever possible. For logic updates in `override.js`, craft a minimal fixture JSON and run it through `main(config)` to confirm new groups and rules appear as intended. When adding rule providers, ensure the remote URL resolves and provide a fallback copy inside `ruleset/`. Smoke-test geosite toggles by disabling/enabling adjacent entries to verify dependencies.

## Commit & Pull Request Guidelines
Use short, descriptive commit subjects (≤60 chars) similar to `modified the direct url...`; add detail in the body when touching multiple areas. Reference related issues or subscription tickets with `Refs: #123` if applicable. Pull requests should include: a one-paragraph summary of the change, how you validated it (commands or client screenshots), and any migration notes for downstream subscribers. Document breaking changes in the PR description and update this guide when workflows shift.

## Configuration Tips
Keep icon URLs on a trusted CDN (Fastly jsDelivr preferred) and verify they load over HTTPS. When introducing new DNS or proxy settings, extend the `remoteRuleSets` or `hostOverrides` blocks in `override.js` and mirror the selector layout used in the Surge baseline.
