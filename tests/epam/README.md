# EPAM Website – Playwright Test Suite

## Scope
Automated end-to-end tests for the [EPAM website](https://www.epam.com/) covering header navigation and key user journeys.

---

## Test Files

| File | Description |
|------|-------------|
| `epam_services_client_work.spec.ts` | Navigates via the **Services** header menu and verifies the **Client Work** page |

---

## Test Cases

### `epam_services_client_work.spec.ts`

| ID | Title | Steps | Expected Result |
|----|-------|-------|-----------------|
| TC-001 | Navigate to Client Work via Services menu | 1. Go to `https://www.epam.com/` <br> 2. Click **Services** in header <br> 3. Click **Explore Our Client Work** | "Client Work" text is visible; URL matches `/client-work` pattern |
| TC-002 | Services link visible in header | Load homepage | `Services` link is visible & enabled in `<header>` |
| TC-003 | Explore Our Client Work link accessible | Open Services section | Link is visible & enabled |

---

## Running the Tests

```bash
# Install dependencies
npm install
npx playwright install

# Run all EPAM tests
npx playwright test tests/epam/

# Run a specific test file
npx playwright test tests/epam/epam_services_client_work.spec.ts

# Run in headed mode (visible browser)
npx playwright test tests/epam/ --headed

# Generate HTML report
npx playwright show-report
```

---

## Known Limitations

> ⚠️ **Cloudflare Bot Protection**  
> `https://www.epam.com/` is protected by Cloudflare, which may return **HTTP 403** and block headless browser automation in CI environments.  
>
> **Recommended mitigations:**
> - Run tests with `--headed` mode and a real browser profile.
> - Use Playwright's `stealth` plugin or a proxy with residential IPs for CI.
> - Consider mocking the network layer for unit-level navigation tests.
