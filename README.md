# Sushma Elitea — Playwright Test Suite

> **Automated QA** for [epam.com](https://www.epam.com) — TypeScript · Playwright · Page Object Model

---

## 🧪 Test Scenario

| Step | Action | Expected Result |
|------|--------|-----------------|
| **1** | Navigate to `https://www.epam.com/` | Homepage loads successfully |
| **2** | Select **"Services"** from the header menu | Services mega-menu appears |
| **3** | Click **"Explore Our Client Work"** | Browser navigates to `/our-work` |
| **4** | Verify **"Client Work"** text is visible | Text is present on the page |

---

## 📁 Repository Structure

```
├── playwright.config.ts              # Global Playwright configuration
├── package.json                      # npm scripts & dependencies
├── tsconfig.json                     # TypeScript compiler options
├── ci/
│   └── playwright-ci-workflow.yml    # GitHub Actions CI (copy → .github/workflows/)
└── tests/
    ├── pages/
    │   ├── BasePage.ts               # Shared: navigation, cookie banner, assertions
    │   ├── HomePage.ts               # POM: EPAM homepage + header nav
    │   └── ClientWorkPage.ts         # POM: /our-work landing page
    └── epam/
        ├── epam_services_client_work.spec.ts   # 5 test cases
        └── README.md                           # Suite-level docs
```

---

## 🗂️ Test Cases

| ID | Title | Type |
|----|-------|------|
| TC-01 | Full happy-path: Homepage → Services → Client Work → verify text | E2E |
| TC-02 | Services mega-menu contains "Explore Our Client Work" link | UI |
| TC-03 | Direct URL `/our-work` navigation shows "Client Work" content | Navigation |
| TC-04 | "Services" header nav item is visible and interactive | Smoke |
| TC-05 | Client Work page loads without uncaught JS errors | Stability |

---

## 🚀 Quick Start

```bash
# 1 — Install dependencies
npm install

# 2 — Install Playwright browsers
npx playwright install

# 3 — Run the EPAM suite (headed Chromium — recommended)
npm run test:epam

# 4 — View the HTML report
npm run report
```

### All available scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (headless) |
| `npm run test:headed` | Run all tests (headed) |
| `npm run test:epam` | Run EPAM suite — headed Chromium |
| `npm run test:chromium` | Chromium only |
| `npm run test:firefox` | Firefox only |
| `npm run test:webkit` | WebKit / Safari only |
| `npm run report` | Open HTML report |
| `npm run typecheck` | TypeScript type-check |

---

## 🏗️ Design Highlights

| Feature | Detail |
|---------|--------|
| **Page Object Model** | `BasePage → HomePage / ClientWorkPage` |
| **`test.step()` wrappers** | Every action labelled for rich HTML reports |
| **Resilient selectors** | Primary + fallback CSS per locator |
| **Cookie banner auto-dismiss** | Handled in `BasePage.dismissCookieBanner()` |
| **JS error capture** | TC-05 listens for `page.on('pageerror')` |
| **Headed mode default** | Reduces Cloudflare bot-detection false positives |

---

## ⚠️ Known Limitations

| Issue | Mitigation |
|-------|------------|
| Cloudflare Bot Protection (HTTP 403) | Run with `--headed`; add stealth plugin for CI |
| Cookie / GDPR banner | Auto-dismissed via `BasePage` |
| Mega-menu animation timing | 500 ms guard + `waitFor({ state: 'visible' })` |

---

## 🔧 CI Setup

Copy the provided workflow file to enable GitHub Actions:

```bash
cp ci/playwright-ci-workflow.yml .github/workflows/playwright.yml
```

The pipeline will:
1. Install Node.js 20 + npm dependencies
2. Install Chromium via `npx playwright install`
3. Run the EPAM test suite
4. Upload the HTML report as a build artifact (14-day retention)