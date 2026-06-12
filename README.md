# Playwright + TypeScript + Cucumber BDD Framework

A ready-to-run BDD automation skeleton. Add your client URL and locators — everything else is wired.

## Folder Structure

```
playwright-bdd-framework/
├── features/                  # Gherkin feature files
│   ├── login.feature
│   └── home.feature
├── src/
│   ├── pages/                 # Page Object Model
│   │   ├── BasePage.ts        # Reusable actions (click, fill, waits, asserts)
│   │   ├── LoginPage.ts       # >>> ADD CLIENT LOCATORS HERE <<<
│   │   └── HomePage.ts        # >>> ADD CLIENT LOCATORS HERE <<<
│   ├── steps/                 # Step definitions
│   │   ├── login.steps.ts
│   │   └── home.steps.ts
│   ├── support/
│   │   ├── world.ts           # Custom World (per-scenario state)
│   │   └── hooks.ts           # Browser lifecycle + screenshot on failure
│   └── utils/
│       ├── logger.ts          # Winston logger (console + file)
│       ├── dataReader.ts      # JSON test data reader
│       └── generateReport.js  # Rich HTML dashboard report
├── config/
│   └── env.config.ts          # Typed config loaded from .env
├── test-data/
│   └── testData.json          # >>> ADD CLIENT TEST DATA HERE <<<
├── .env.example               # >>> COPY TO .env, ADD CLIENT URL <<<
├── cucumber.js                # Cucumber config
├── tsconfig.json
└── package.json
```

## Setup (one time)

```powershell
# 1. Install dependencies
npm install

# 2. Install browsers
npx playwright install

# 3. Create your env file
copy .env.example .env
```

## Add Your Client Details (3 places)

| Where | What |
|---|---|
| `.env` | `BASE_URL`, `APP_USERNAME`, `APP_PASSWORD` |
| `src/pages/*.ts` | Replace placeholder locators (marked with `TODO`) |
| `test-data/testData.json` | Client-specific test data |

## Run Tests

```powershell
npm test                  # all features
npm run test:smoke        # @smoke tag only
npm run test:regression   # @regression tag only
npm run test:headed       # watch the browser
npm run test:firefox      # different browser
npm run test:parallel     # 2 workers
npm run test:report       # run tests + generate rich HTML report
```

## Reports

- `reports/cucumber-report.html` — built-in cucumber HTML (auto, every run)
- `reports/html-report/index.html` — rich dashboard (after `npm run report`)
- `reports/screenshots/` — full-page screenshots on failure (also embedded in report)
- `reports/execution.log` — execution log

## Adding a New Page (pattern)

1. Copy `src/pages/HomePage.ts` → `ProductsPage.ts`, rename class
2. Replace locators with the client's
3. Write a feature file in `features/`
4. Add steps in `src/steps/` using `this.page` from `CustomWorld`
