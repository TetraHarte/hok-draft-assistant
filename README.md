# HoK Solo Draft Assistant v0.16.1 — iPhone PWA

This is the free iPhone version. It uses the same app core/data schema as the desktop build, but it does **not** require a Safari extension or Apple Developer Program.

Important: a real install/offline test requires this folder to be served over HTTPS. Opening `index.html` as a local file is not enough for service workers/Add to Home Screen behavior.

## Free deployment

This folder is ready for any free static HTTPS host. GitHub Pages is the most straightforward long-term option:

1. Create a free GitHub repository.
2. Upload the *contents* of this `iphone-pwa-v0161` folder to the repository root.
3. Repository Settings → Pages.
4. Deploy from the main branch / root.
5. Open the resulting HTTPS Pages address in Safari on the iPhone.
6. Share → Add to Home Screen.

## Moving desktop data to iPhone

Browser storage does not automatically sync between the Chrome extension and Safari/PWA.

Desktop:
Accounts → Data Safety → Export Backup.

iPhone:
Accounts → Data Safety → choose that JSON from Files → Validate & Restore.

## Camp shortcut

`Open Camp Profile` opens the selected account's Camp profile in Safari. Return to the Home Screen assistant afterward. Page-hide saving is enabled so the assistant preserves the current state before Safari switches away.
