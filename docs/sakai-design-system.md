# SAKAI PrimeNG design system

## Layout architecture

SAKAI uses a shell wrapper with a root `<div class="layout-wrapper">`. The wrapper receives dynamic CSS classes from Angular computed signals to switch layout mode and sidebar state.

Component tree:

```text
ShellComponent
├── TopbarComponent
├── SidebarComponent
└── .layout-main-container
    └── .layout-main
        └── router-outlet
```

### Layout modes
- `layout-static` — default desktop layout with fixed sidebar space reserved in content.
- `layout-overlay` — sidebar floats above content and slides in when toggled.

### State classes
- `layout-static-inactive` — desktop static sidebar collapsed.
- `layout-overlay-active` — overlay sidebar open.
- `layout-mobile-active` — mobile sidebar open.

## Key measurements

| Element | Value |
|---------|-------|
| Topbar height | `4rem` |
| Sidebar width | `20rem` |
| Sidebar top offset | `6rem` |
| Sidebar left offset | `2rem` |
| Content margin-left (static open) | `22rem` |
| Content padding-top | `6rem` |
| Content padding-horizontal | `2rem` |
| Mobile breakpoint | `991px` |
| Sidebar transition | `0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99)` |

## LayoutService signals

The layout state is driven by Angular signals:

- `menuMode: 'static' | 'overlay'` — default is `'static'`.
- `staticMenuDesktopInactive: boolean` — desktop sidebar collapsed state.
- `overlayMenuActive: boolean` — overlay sidebar visibility.
- `mobileMenuActive: boolean` — mobile sidebar visibility.
- `activePath: string` — current route used to mark active navigation items.

## CSS variable aliases

SAKAI maps layout styling to PrimeNG design tokens through aliases:

```scss
--surface-ground: var(--p-surface-100); /* page background */
--surface-card: var(--p-content-background); /* card/panel background */
--surface-overlay: var(--p-overlay-popover-background); /* sidebar bg */
--surface-hover: var(--p-content-hover-background);
--surface-border: var(--p-content-border-color);
--text-color: var(--p-text-color);
--text-color-secondary: var(--p-text-muted-color);
--primary-color: var(--p-primary-color);
--content-border-radius: var(--p-content-border-radius);
--layout-section-transition-duration: 0.2s;
```

These aliases let layout SCSS stay stable while PrimeNG theme tokens control the actual colors, borders, and radii.

## Responsive behavior

### Desktop: static open
- Sidebar is fixed at `left: 2rem`, `top: 6rem`.
- Main content uses `margin-left: 22rem` to reserve sidebar space.

### Desktop: static inactive
- Sidebar is shifted off-canvas with `translateX(-100%)` and `left: 0`.
- Main content resets to `margin-left: 0`.

### Desktop: overlay
- Sidebar starts off-screen with `translateX(-100%)`.
- Toggle adds the active state so the sidebar slides in above the content.

### Mobile (`<= 991px`)
- Sidebar is always off-screen by default.
- Opening the menu uses `layout-mobile-active`.
- A `.layout-mask` backdrop is displayed while the sidebar is open.

## Navigation menu pattern

SAKAI uses a custom list-based menu instead of `p-panelMenu`.

```html
<ul class="layout-menu">
  <li>
    <a routerLink pRipple routerLinkActive="active-route">...</a>
  </li>
</ul>
```

Pattern details:
- Root list: `<ul class="layout-menu">`
- Group labels: `<div class="layout-menuitem-root-text">`
- Link pattern: `<a routerLink pRipple routerLinkActive="active-route">`
- Item padding: `0.75rem 1rem`
- Hover state: `background-color: var(--surface-hover)` with `border-radius: var(--content-border-radius)`
- Active state: `color: var(--primary-color)` and `font-weight: 700`

## Topbar pattern

The topbar is fixed, full width, and sits above the rest of the layout.

- Height: `4rem`
- `z-index: 1000`
- Background: `var(--surface-overlay)`
- Bottom border: `1px solid var(--surface-border)`

### Topbar regions
- Left section (`20rem` wide): hamburger button plus logo (icon and text).
- Right section: dark mode toggle and user actions (avatar, name, logout).

## Implementation summary

SAKAI’s layout is a signal-driven shell with a fixed topbar, responsive sidebar states, and token-based styling. The design system relies on wrapper state classes rather than complex component libraries, which makes it a good fit for a custom PrimeNG application shell.
