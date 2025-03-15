# Component Documentation

## UI Components

### EventCard

Display event information in a card format.

```tsx
import { EventCard } from "@/app/components/ui/EventCard";

// Usage
<EventCard
  id={event.id}
  slug={event.slug}
  title={event.title}
  summary={event.excerpt || ""}
  featuredImage={event.featuredImage}
  publishedAt={event.eventData.eventStartTime}
  category="event"
  categoryName="Sự kiện"
  author={event.author?.node.name}
/>;
```

Features:

- Responsive image handling
- Date formatting
- Category badge
- Author attribution
- Hover animations

### NewsCard

Display news/blog posts in a card format.

```tsx
import { NewsCard } from "@/app/components/ui/NewsCard";

// Usage
<NewsCard
  id={post.id}
  slug={post.slug}
  title={post.title}
  summary={post.excerpt || ""}
  featuredImage={post.featuredImage}
  publishedAt={post.date}
  category={post.categories.nodes[0]?.slug || "news"}
  categoryName={post.categories.nodes[0]?.name || "Tin tức"}
  author={post.author?.node.name}
/>;
```

Features:

- Featured image with fallback
- Category labeling
- Excerpt truncation
- Publication date
- Author display

### SchoolCard

Display school and associated clubs.

```tsx
import { SchoolCard } from "@/app/components/network/SchoolCard";

// Usage
<SchoolCard school={school} clubs={school.clubs.nodes} />;
```

Features:

- School logo and info
- List of associated clubs
- Member count display
- Interactive hover states
- Nested navigation

## Navigation Components

### NavigationMenu

Main navigation menu with dropdown support.

```tsx
import { NavigationMenu } from "@/app/components/navigation/NavigationMenu";

// Usage
<NavigationMenu
  schools={schools}
  currentLang={currentLang}
  onToggleLanguage={handleLanguageToggle}
/>;
```

Features:

- Nested dropdowns
- Language switcher
- Active state handling
- Mobile responsiveness

### MobileMenu

Mobile-optimized navigation menu.

```tsx
import { MobileMenu } from "@/app/components/navigation/MobileMenu";

// Usage
<MobileMenu
  isOpen={mobileMenuOpen}
  onClose={() => setMobileMenuOpen(false)}
  schools={schools}
/>;
```

Features:

- Slide-in animation
- Touch-friendly targets
- Nested navigation
- Backdrop overlay

### DesktopMenu

Desktop mega menu for network navigation.

```tsx
import { DesktopMenu } from "@/app/components/navigation/DesktopMenu";

// Usage
<DesktopMenu schools={schools} scrolled={scrolled} />;
```

Features:

- Mega menu layout
- Scroll behavior
- School/club organization
- Visual hierarchy

## Filter Components

### NewsFilter

Filter and display news posts by category.

```tsx
import { NewsFilter } from "@/app/components/news/NewsFilter";

// Usage
<NewsFilter categories={categories} posts={posts} />;
```

Features:

- Category filtering
- Dynamic grid layout
- Empty state handling
- Real-time filtering

### CategoryTabs

Reusable category filter tabs.

```tsx
import { CategoryTabs } from "@/app/components/ui/CategoryTabs";

// Usage
<CategoryTabs
  categories={categories}
  onSelect={setSelectedCategory}
  className="mb-8"
/>;
```

Features:

- Active state
- Responsive design
- Accessibility support
- Custom styling

## Best Practices

### Data Loading

```tsx
// Use Suspense for loading states
<Suspense fallback={<CardSkeleton />}>
  <NewsCard {...post} />
</Suspense>;

// Handle empty states
{
  items.length === 0 && <EmptyState icon="📭" message="No items found" />;
}
```

### Error Handling

```tsx
// Component error boundaries
<ErrorBoundary fallback={<ErrorMessage />}>
  <ComponentWithData />
</ErrorBoundary>;

// Data error states
{
  error && <Alert type="error" message={getErrorMessage(error)} />;
}
```

### Performance

```tsx
// Image optimization
<Image
  src={imageUrl}
  alt={altText}
  width={400}
  height={300}
  className="object-cover"
  loading="lazy"
/>;

// Memoization for expensive computations
const filteredItems = useMemo(() => items.filter(filterFn), [items, filterFn]);
```

### Accessibility

```tsx
// ARIA labels
<button
  aria-label="Close menu"
  aria-expanded={isOpen}
  onClick={onClose}
>

// Keyboard navigation
<div
  role="menu"
  tabIndex={0}
  onKeyDown={handleKeyboardNav}
>
```

### Responsive Design

```tsx
// Tailwind responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

### State Management

```tsx
// Local component state
const [isOpen, setIsOpen] = useState(false);

// Derived state
const hasItems = items.length > 0;
const canLoadMore = hasNextPage && !loading;
```

## Common Patterns

### Data Fetching

```tsx
// Page component
export default async function EventsPage() {
  const { events } = await getEventsData();
  return <EventsList events={events} />;
}

// Client component
("use client");
export function EventsList({ events }) {
  const { filteredEvents } = useEventFilters(events);
  return filteredEvents.map((event) => <EventCard key={event.id} {...event} />);
}
```

### Layout Organization

```tsx
// Consistent layout structure
<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
  <PageHeader title={title} description={description} />
  <main className="space-y-12">
    <ComponentA />
    <ComponentB />
  </main>
</div>
```

### Animation Patterns

```tsx
// Transition classes
<div
  className={`
  transition-all duration-300
  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
`}
>
  {content}
</div>
```
