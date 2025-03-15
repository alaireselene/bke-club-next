# E2E and Performance Testing

## E2E Testing with Playwright

### Setup

```typescript
// playwright.config.ts
import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        browserName: "chromium",
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: "Mobile Safari",
      use: {
        browserName: "webkit",
        viewport: { width: 375, height: 667 },
      },
    },
  ],
};

export default config;
```

### Navigation Tests

```typescript
// e2e/navigation.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("navigates through main sections", async ({ page }) => {
    await page.goto("/");

    // Test main navigation
    await page.click("text=Tin tức");
    await expect(page).toHaveURL("/news");

    await page.click("text=Sự kiện");
    await expect(page).toHaveURL("/events");

    // Test network navigation
    await page.hover("text=Mạng lưới");
    await page.click("text=SEE"); // School of Electrical Engineering
    await expect(page).toHaveURL("/network?school=SEE");
  });

  test("mobile menu works correctly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    await page.click('button[aria-label="Open menu"]');
    await expect(page.locator(".mobile-menu")).toBeVisible();

    await page.click("text=Tin tức");
    await expect(page).toHaveURL("/news");
    await expect(page.locator(".mobile-menu")).not.toBeVisible();
  });
});
```

### Content Flow Tests

```typescript
// e2e/content.spec.ts
test.describe("Content Flows", () => {
  test("can view and filter news", async ({ page }) => {
    await page.goto("/news");

    // Check initial load
    await expect(page.locator("article")).toHaveCount(10);

    // Test category filter
    await page.click("text=Nghiên cứu");
    await expect(page.locator("article")).toHaveCount(5);

    // Test article navigation
    await page.click("article:first-child");
    await expect(page).toHaveURL(/\/news\/[\w-]+/);
  });

  test("event registration flow", async ({ page }) => {
    await page.goto("/events");

    // Find upcoming event
    await page.click("text=Sự kiện sắp diễn ra >> article:first-child");

    // Check registration button
    const registerButton = page.locator("text=Đăng ký tham gia");
    await expect(registerButton).toBeVisible();

    // Verify external registration link
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      registerButton.click(),
    ]);
    await expect(newPage.url()).toContain("forms.google.com");
  });
});
```

### SEO and Meta Tests

```typescript
// e2e/seo.spec.ts
test.describe("SEO Essentials", () => {
  test("pages have correct meta tags", async ({ page }) => {
    const routes = ["/", "/news", "/events", "/network"];

    for (const route of routes) {
      await page.goto(route);

      // Check title and description
      await expect(page).toHaveTitle(/HUST Research/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        /./
      );

      // Check OpenGraph tags
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
        "content",
        /./
      );
    }
  });
});
```

## Performance Testing

### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://your-site.com/
            https://your-site.com/news
            https://your-site.com/events
          configPath: ./lighthouserc.json
          uploadArtifacts: true
```

### Performance Monitoring

```typescript
// utils/performance.ts
export function reportWebVitals(metric: any) {
  if (metric.label === "web-vital") {
    console.log(metric);
  }
}

// Performance marks for key interactions
export function markInteraction(name: string) {
  if (typeof performance !== "undefined") {
    performance.mark(`${name}-start`);
    return () => {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
    };
  }
  return () => {};
}

// Usage in components
function EventList() {
  useEffect(() => {
    const endMark = markInteraction("event-list-render");
    return endMark;
  }, []);
}
```

### Load Testing with k6

```javascript
// k6/news-feed.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 20 },
    { duration: "1m", target: 50 },
    { duration: "20s", target: 0 },
  ],
};

export default function () {
  const responses = http.batch([
    ["GET", "https://your-site.com/news"],
    ["GET", "https://your-site.com/events"],
    [
      "GET",
      "https://your-site.com/api/graphql",
      {
        query: `
        query GetPosts {
          posts(first: 10) {
            nodes {
              id
              title
            }
          }
        }
      `,
      },
    ],
  ]);

  check(responses[0], {
    "news page returns 200": (r) => r.status === 200,
    "news loads within 2s": (r) => r.timings.duration < 2000,
  });

  sleep(1);
}
```

### Core Web Vitals Monitoring

```typescript
// monitoring/web-vitals.ts
import { onCLS, onFID, onLCP } from "web-vitals";

function sendToAnalytics({ name, delta, id }: any) {
  // Send to your analytics service
  console.log({
    metric: name,
    value: delta,
    id: id,
  });
}

export function initVitalsReporting() {
  onCLS(sendToAnalytics);
  onFID(sendToAnalytics);
  onLCP(sendToAnalytics);
}
```

### GraphQL Performance Testing

```typescript
// monitoring/graphql-metrics.ts
const withTimings = async (queryFn: () => Promise<any>, metricName: string) => {
  const start = performance.now();
  try {
    const result = await queryFn();
    const duration = performance.now() - start;

    // Report metrics
    console.log({
      metric: metricName,
      duration,
      success: true,
    });

    return result;
  } catch (error) {
    const duration = performance.now() - start;

    console.error({
      metric: metricName,
      duration,
      success: false,
      error: error.message,
    });

    throw error;
  }
};

// Usage
const { data } = await withTimings(
  () =>
    getClient().query({
      query: GET_POSTS,
      variables: { first: 10 },
    }),
  "fetch-posts"
);
```

### Performance Best Practices

#### Image Optimization

```typescript
// components/OptimizedImage.tsx
export function OptimizedImage({ src, alt, ...props }) {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw,
               (max-width: 1200px) 50vw,
               33vw"
        loading="lazy"
        className="object-cover"
        {...props}
      />
    </div>
  );
}
```

#### Data Caching

```typescript
// utils/cache.ts
const CACHE_TIME = 60 * 60 * 1000; // 1 hour

export async function getCachedData(key: string, fetcher: () => Promise<any>) {
  const cached = localStorage.getItem(key);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TIME) {
      return data;
    }
  }

  const fresh = await fetcher();
  localStorage.setItem(
    key,
    JSON.stringify({
      data: fresh,
      timestamp: Date.now(),
    })
  );

  return fresh;
}
```

#### Code Splitting

```typescript
// pages/events/index.tsx
const EventCalendar = dynamic(() => import("@/components/EventCalendar"), {
  loading: () => <EventCalendarSkeleton />,
  ssr: false,
});

const EventFilters = dynamic(() => import("@/components/EventFilters"), {
  ssr: true,
});
```
