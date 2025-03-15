# HUST Research Clubs Design System

## Core Principles

### Component Foundation

- Use shadcn components as the base for all UI elements
- Enhance with DaisyUI utilities when needed
- Customize components to match our design system rather than creating from scratch
- Follow the "extend, don't reinvent" principle

## Component Design Patterns

### Cards

- Use subtle shadows (`shadow-sm`) with hover enhancement (`hover:shadow-md`)
- Apply glass-morphism effect with `backdrop-blur-[2px]`
- Rounded corners using `rounded-xl`
- White background with subtle border (`border-slate-200/60`)
- Interactive states with smooth transitions
- Image hover effects with scale transformation

### Typography

- All text: Manrope (sans-serif) for clean, modern look
- Text colors:
  - Primary text: `text-foreground`
  - Secondary text: `text-slate-600`
  - Accent text: `text-cardinal-600`

### Interactive Elements

- Hover states should be smooth (0.2s transition)
- Primary actions: Cardinal Red (`cardinal-600`)
- Secondary actions: Navy Blue (`navy-600`)
- Accent elements: Sunflower Yellow (`sunflower-500`)

### Layout Patterns

- Consistent padding: `p-6` for card content
- Proper spacing between elements: `space-y-4`
- Grid-based layouts with responsive design
- Content sections separated by subtle borders (`border-slate-100`)

### Icons & Images

- Icons: Lucide React icons
- Icon colors: Cardinal Red for accent (`text-cardinal-500`)
- Images: Proper aspect ratios with object-fit
- Image transitions: Subtle scale on hover

### Animation Guidelines

- Use `transition-all duration-200` for smooth interactions
- Hover transformations should be subtle
- Loading states should use subtle fade-ins
- Avoid aggressive animations that might distract

### Shadows & Depth

- Default: `shadow-sm`
- Hover: `hover:shadow-md`
- Active elements: `shadow-lg`
- Modal/overlay: `shadow-xl`

### Responsive Design

- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

### Navigation Patterns

#### Desktop Navigation

- Container styling:
  ```tsx
  <nav className="bg-white/10 backdrop-blur-md rounded-full px-6 py-2">
  ```
- Link styling:
  ```tsx
  <Link className="flex items-center gap-2 transition-all duration-200 hover:text-cardinal-400 text-chalk-100">
  ```
- Active state: `text-cardinal-500`
- Icons: Consistent `h-4 w-4` sizing
- Text: `font-medium` for better visibility
- Spacing: `gap-2` between icon and text, `space-x-6` between items
- Dark mode: `dark:bg-white/5` for container

#### Mobile Menu

- Backdrop:
  ```tsx
  <div className="bg-cardinal-900/60 backdrop-blur-sm">
  ```
- Menu Panel:
  ```tsx
  <div className="bg-white/95 backdrop-blur-md shadow-xl">
  ```
- Animations:
  - Menu slide: `transition-all duration-300 ease-out`
  - Scale effect: `transform scale-95` to `scale-100`
  - Opacity transitions for smooth open/close
- Links and Buttons:
  - Rounded corners: `rounded-full`
  - Hover states: `hover:bg-cardinal-50/30`
  - Active states: `bg-cardinal-50/50 text-cardinal-600`
  - Transitions: `transition-all duration-200`
- Section Headers:
  - Font: `font-sans text-sm font-semibold`
  - Color: `text-cardinal-600/70`
  - Spacing: `px-4 py-2`
- Nested Content:
  - Indentation: `ml-8`
  - Spacing: `space-y-0.5`
  - Member counts: `rounded-full bg-slate-100/80`

### Component Examples

#### Card Base Style

```tsx
<div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden transition hover:shadow-md backdrop-blur-[2px]">
  {/* Card content */}
</div>
```

#### Interactive Text

```tsx
<h3 className="text-lg font-semibold group-hover:text-cardinal-600 transition-colors">
  {/* Title content */}
</h3>
```

#### Icon with Text

```tsx
<div className="flex items-center text-sm text-slate-600">
  <Icon className="h-4 w-4 mr-2 text-cardinal-500" />
  <span>{/* Content */}</span>
</div>
```

#### Image Container

```tsx
<div className="relative overflow-hidden">
  <Image
    className="object-cover transition group-hover:scale-105"
    /* other props */
  />
</div>
```

### Dark Mode Support

- Background: `dark:bg-card/95`
- Text: `dark:text-slate-200`
- Borders: `dark:border-border/50`
- Hover states should remain subtle

### Accessibility

- Maintain WCAG 2.1 AA standards
- Proper color contrast ratios
- Clear focus states
- Semantic HTML structure
