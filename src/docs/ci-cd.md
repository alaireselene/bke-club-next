# CI/CD and Visual Regression Testing

## CI/CD Configuration

### GitHub Actions Workflow

```yaml
# .github/workflows/main.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "20"
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install

      - name: Type check
        run: pnpm type-check

      - name: Run tests
        run: pnpm test
        env:
          NEXT_PUBLIC_WORDPRESS_API_URL: ${{ secrets.WORDPRESS_API_URL }}

      - name: Run E2E tests
        uses: playwright-community/action-playwright@v1
        with:
          command: pnpm test:e2e
        env:
          BASE_URL: ${{ secrets.STAGING_URL }}

  visual-regression:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install dependencies
        run: pnpm install

      - name: Run visual regression tests
        run: pnpm test:visual
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}

  deploy:
    needs: [test, visual-regression]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Vercel
        uses: vercel/action@v3
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: "--prod"
```

### Environment Configuration

```yaml
# .env.example
NEXT_PUBLIC_WORDPRESS_API_URL=https://wp.example.com/graphql
WORDPRESS_PREVIEW_SECRET=your-secret-here
REVALIDATE_TOKEN=your-token-here

# .env.test
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:8080/graphql
WORDPRESS_PREVIEW_SECRET=test-secret
```

## Visual Regression Testing

### Percy Configuration

```javascript
// percy.config.js
module.exports = {
  version: 2,
  snapshot: {
    widths: [375, 768, 1280],
    minHeight: 1024,
    percyCSS: `
      .loading-skeleton { display: none; }
      [data-percy-hidden] { visibility: hidden; }
    `,
  },
  discovery: {
    allowedHostnames: ["wp.example.com"],
    networkIdleTimeout: 750,
  },
};
```

### Snapshot Tests

```typescript
// visual-regression/snapshot.test.ts
import { test, expect } from "@playwright/test";
import percySnapshot from "@percy/playwright";

test.describe("Visual Regression", () => {
  test("homepage", async ({ page }) => {
    await page.goto("/");
    await percySnapshot(page, "Homepage");
  });

  test("news listing", async ({ page }) => {
    await page.goto("/news");
    // Wait for content to load
    await page.waitForSelector("article");
    await percySnapshot(page, "News Listing");
  });

  test("event details", async ({ page }) => {
    // Get first event
    await page.goto("/events");
    await page.click("article:first-child");
    await page.waitForLoadState("networkidle");
    await percySnapshot(page, "Event Details");
  });

  test("network section with school filter", async ({ page }) => {
    await page.goto("/network?school=SEE");
    await page.waitForSelector('[data-testid="school-card"]');
    await percySnapshot(page, "Network - School Filter");
  });
});
```

### Component Snapshots

```typescript
// components/NewsCard/NewsCard.visual.tsx
import { test } from "@playwright/test";
import percySnapshot from "@percy/playwright";

test.describe("NewsCard Component", () => {
  test("variations", async ({ page }) => {
    await page.goto("/stories/news-card");

    // Default state
    await percySnapshot(page, "NewsCard - Default");

    // With long content
    await page.click('[data-testid="long-content"]');
    await percySnapshot(page, "NewsCard - Long Content");

    // With missing image
    await page.click('[data-testid="no-image"]');
    await percySnapshot(page, "NewsCard - No Image");
  });
});
```

### Testing Helpers

```typescript
// visual-regression/helpers.ts
import { Page } from "@playwright/test";

export async function waitForContentToLoad(page: Page) {
  // Wait for WordPress content
  await Promise.all([
    page.waitForResponse(
      (response) =>
        response.url().includes("/graphql") && response.status() === 200
    ),
    page.waitForSelector('[data-testid="content-loaded"]'),
  ]);
}

export async function setupMockData(page: Page) {
  await page.route("**/graphql", async (route) => {
    const json = require("./fixtures/mock-data.json");
    await route.fulfill({ json });
  });
}
```

### Test Scripts

```json
{
  "scripts": {
    "test:visual": "percy exec -- playwright test visual-regression/",
    "test:visual:update": "percy exec -- playwright test visual-regression/ --update-snapshots"
  }
}
```

## Visual Testing Best Practices

### Component States

```typescript
// components/EventCard/EventCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { EventCard } from "./EventCard";

const meta: Meta<typeof EventCard> = {
  component: EventCard,
  parameters: {
    percy: {
      enabled: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof EventCard>;

export const Default: Story = {
  args: {
    title: "Sample Event",
    summary: "Event description...",
    publishedAt: new Date().toISOString(),
  },
};

export const LongContent: Story = {
  args: {
    ...Default.args,
    title: "Very Long Event Title That Should Wrap to Multiple Lines...",
    summary: "A very long description that should be truncated...",
  },
};

export const WithImage: Story = {
  args: {
    ...Default.args,
    featuredImage: {
      node: {
        sourceUrl: "/sample-image.jpg",
      },
    },
  },
};
```

### CI Integration

```yaml
# .github/workflows/visual.yml
name: Visual Regression Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  visual:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "20"
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install

      - name: Build Storybook
        run: pnpm build-storybook

      - name: Percy Test
        run: pnpm percy storybook ./storybook-static
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

### Handling Dynamic Content

```typescript
// utils/test-utils.ts
export function stabilizeContent(page: Page) {
  return page.evaluate(() => {
    // Fix dates
    document.querySelectorAll("time").forEach((el) => {
      el.setAttribute("datetime", "2025-01-01T00:00:00Z");
      el.textContent = "1 January 2025";
    });

    // Fix images
    document.querySelectorAll("img").forEach((el) => {
      el.style.animation = "none";
    });

    // Fix loading states
    document.querySelectorAll("[data-loading]").forEach((el) => {
      el.removeAttribute("data-loading");
    });
  });
}
```
