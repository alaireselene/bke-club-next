# Hooks and Testing Documentation

## WordPress Hooks

### usePosts

Fetch and manage posts with pagination.

```tsx
import { usePosts } from "@/hooks/useWordPress";

function NewsList() {
  const { posts, pageInfo, loading, error, loadMore } = usePosts({
    first: 10,
    category: "news",
  });

  if (loading) return <NewsListSkeleton />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <NewsCard key={post.id} {...post} />
        ))}
      </div>
      {pageInfo.hasNextPage && (
        <LoadMoreButton onClick={loadMore} loading={loading} />
      )}
    </>
  );
}
```

### useEvents

Manage events with filtering and sorting.

```tsx
import { useEvents } from "@/hooks/useWordPress";

function EventsList() {
  const { events, pageInfo, loading } = useEvents({ first: 20 });

  const [upcomingEvents, pastEvents] = useMemo(() => {
    const now = new Date();
    return events.reduce(
      (acc, event) => {
        const [upcoming, past] = acc;
        const eventDate = new Date(event.eventData.eventStartTime);
        return eventDate >= now
          ? [[...upcoming, event], past]
          : [upcoming, [...past, event]];
      },
      [[], []] as [typeof events, typeof events]
    );
  }, [events]);

  return (
    <div className="space-y-12">
      <section>
        <h2>Upcoming Events</h2>
        <EventGrid events={upcomingEvents} />
      </section>
      <section>
        <h2>Past Events</h2>
        <EventGrid events={pastEvents} />
      </section>
    </div>
  );
}
```

### useSchools

Fetch and manage school network data.

```tsx
import { useSchools } from "@/hooks/useWordPress";

function NetworkMap() {
  const { schools, loading } = useSchools();

  const schoolStats = useMemo(() => {
    return schools.reduce(
      (acc, school) => ({
        totalClubs: acc.totalClubs + school.clubs.nodes.length,
        totalMembers:
          acc.totalMembers +
          school.clubs.nodes.reduce(
            (sum, club) => sum + (club.clubFields?.membersCount || 0),
            0
          ),
      }),
      { totalClubs: 0, totalMembers: 0 }
    );
  }, [schools]);

  return (
    <div>
      <NetworkStats {...schoolStats} />
      <SchoolList schools={schools} />
    </div>
  );
}
```

### useNavigationData

Handle global navigation data.

```tsx
import { useNavigationData } from "@/hooks/useWordPress";

function Navigation() {
  const { data, loading } = useNavigationData();

  return (
    <nav>
      <SiteTitle>{data?.generalSettings.title}</SiteTitle>
      <SchoolNavigation schools={data?.schools.nodes} />
    </nav>
  );
}
```

## Testing

### Component Testing

#### Card Components

```tsx
import { render, screen } from "@testing-library/react";
import { NewsCard } from "./NewsCard";

describe("NewsCard", () => {
  const mockPost = {
    id: "1",
    slug: "test-post",
    title: "Test Post",
    summary: "Test summary",
    publishedAt: "2025-03-14T12:00:00Z",
    category: "news",
    categoryName: "News",
  };

  it("renders post details correctly", () => {
    render(<NewsCard {...mockPost} />);

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.summary)).toBeInTheDocument();
    expect(screen.getByText(mockPost.categoryName)).toBeInTheDocument();
  });

  it("formats date correctly", () => {
    render(<NewsCard {...mockPost} />);

    const date = new Date(mockPost.publishedAt);
    const formattedDate = new Intl.DateTimeFormat("vi-VN").format(date);
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});
```

#### Navigation Components

```tsx
import { render, fireEvent, screen } from "@testing-library/react";
import { MobileMenu } from "./MobileMenu";

describe("MobileMenu", () => {
  const mockSchools = [
    {
      id: "1",
      name: "School 1",
      slug: "school-1",
      clubs: { nodes: [] },
    },
  ];

  it("opens and closes correctly", () => {
    const onClose = jest.fn();
    const { rerender } = render(
      <MobileMenu isOpen={false} onClose={onClose} schools={mockSchools} />
    );

    expect(screen.getByRole("dialog")).toHaveClass("translate-x-full");

    rerender(
      <MobileMenu isOpen={true} onClose={onClose} schools={mockSchools} />
    );

    expect(screen.getByRole("dialog")).toHaveClass("translate-x-0");
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = jest.fn();
    render(
      <MobileMenu isOpen={true} onClose={onClose} schools={mockSchools} />
    );

    fireEvent.click(screen.getByLabelText("Close menu"));
    expect(onClose).toHaveBeenCalled();
  });
});
```

### Hook Testing

```tsx
import { renderHook, act } from "@testing-library/react-hooks";
import { MockedProvider } from "@apollo/client/testing";
import { useEvents } from "@/hooks/useWordPress";
import { GET_EVENTS } from "@/lib/graphql/queries";

describe("useEvents", () => {
  const mockEvents = [
    {
      id: "1",
      title: "Test Event",
      eventFields: {
        eventStartTime: "2025-03-14T12:00:00Z",
      },
    },
  ];

  const mocks = [
    {
      request: {
        query: GET_EVENTS,
        variables: { first: 10 },
      },
      result: {
        data: {
          posts: {
            nodes: mockEvents,
            pageInfo: {
              hasNextPage: false,
              endCursor: null,
            },
          },
        },
      },
    },
  ];

  it("fetches events correctly", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useEvents({ first: 10 }),
      {
        wrapper: ({ children }) => (
          <MockedProvider mocks={mocks} addTypename={false}>
            {children}
          </MockedProvider>
        ),
      }
    );

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.events).toEqual(mockEvents);
  });
});
```

### Integration Testing

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import EventsPage from "./page";
import { GET_EVENTS } from "@/lib/graphql/queries";

describe("EventsPage", () => {
  const mockEvents = [
    {
      id: "1",
      title: "Upcoming Event",
      eventFields: {
        eventStartTime: "2025-12-25T12:00:00Z",
      },
    },
    {
      id: "2",
      title: "Past Event",
      eventFields: {
        eventStartTime: "2024-01-01T12:00:00Z",
      },
    },
  ];

  const mocks = [
    {
      request: {
        query: GET_EVENTS,
        variables: { first: 100 },
      },
      result: {
        data: {
          posts: {
            nodes: mockEvents,
          },
        },
      },
    },
  ];

  it("separates upcoming and past events", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EventsPage />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Upcoming Event")).toBeInTheDocument();
      expect(screen.getByText("Past Event")).toBeInTheDocument();
    });

    const upcomingSection = screen
      .getByText("Sự kiện sắp diễn ra")
      .closest("section");
    const pastSection = screen
      .getByText("Sự kiện đã diễn ra")
      .closest("section");

    expect(upcomingSection).toContainElement(
      screen.getByText("Upcoming Event")
    );
    expect(pastSection).toContainElement(screen.getByText("Past Event"));
  });
});
```

## Testing Best Practices

### Mocking Data

```tsx
// Create realistic test data
const createMockPost = (overrides = {}) => ({
  id: "test-id",
  slug: "test-slug",
  title: "Test Title",
  excerpt: "Test excerpt",
  date: new Date().toISOString(),
  featuredImage: null,
  ...overrides,
});

// Use in tests
const post = createMockPost({
  title: "Custom Title",
  featuredImage: {
    node: {
      sourceUrl: "/test.jpg",
    },
  },
});
```

### Testing Loading States

```tsx
it("shows loading state", () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Component />
    </MockedProvider>
  );

  expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
});
```

### Testing Error States

```tsx
it("handles errors gracefully", async () => {
  const errorMock = {
    request: {
      query: GET_POSTS,
    },
    error: new Error("Failed to fetch"),
  };

  render(
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <Component />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/error occurred/i)).toBeInTheDocument();
  });
});
```

### Testing User Interactions

```tsx
it("handles user interactions correctly", async () => {
  const user = userEvent.setup();
  render(<FilterComponent posts={mockPosts} />);

  await user.click(screen.getByRole("button", { name: /filter/i }));
  await user.selectOptions(screen.getByRole("combobox"), ["news"]);

  expect(screen.getAllByRole("article")).toHaveLength(2);
});
```
