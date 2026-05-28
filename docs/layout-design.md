# TNTT layout design

## Applying SAKAI to the TNTT app

The TNTT app adopts the SAKAI shell pattern with a simplified application-specific layout.

### Chosen layout behavior
- Default menu mode: `layout-static`
- Fixed sidebar on desktop
- Mobile sidebar uses the SAKAI mask-and-slide pattern
- No dark mode toggle
- No footer component

### Navigation structure
The sidebar should expose these application sections:
- Dashboard
- Thiếu Nhi
- Giáo Lý Viên
- Quỹ
- Lớp
- Sự kiện
- Tài liệu

### Branding
- Logo uses the PrimeNG star icon
- Brand text is `Xứ Đoàn`

### Topbar user section
- Avatar displays computed initials
- Show the user display name
- Provide a logout button

## Component structure

```text
src/app/shared/layout/
  shell/            ← layout-wrapper, containerClass computed, layout-mask
  sidebar/          ← fixed left panel, custom menu items
  topbar/           ← fixed top bar, hamburger, logo, user actions
  layout.service.ts ← signals: menuMode, staticMenuDesktopInactive, mobileMenuActive
```

## File responsibilities

### `shell.component.ts`
- Inject `LayoutService`
- Compute `containerClass` for `layout-static`, `layout-overlay`, and state flags
- Handle layout mask clicks to close overlay/mobile menu states
- Host the overall shell structure with topbar, sidebar, and routed content

### `shell.component.scss`
- Define `.layout-wrapper` shell behavior
- Style `.layout-main-container` spacing relative to the fixed sidebar
- Style `.layout-main` content padding and responsive adjustments
- Declare shared/global CSS variable aliases used by the layout

### `sidebar.component.ts`
- Inject `LayoutService`
- Listen to Angular Router `NavigationEnd` events to reset overlay/mobile menu state after navigation
- Manage outside-click behavior when overlay or mobile sidebar is open
- Render the custom menu items instead of using `p-panelMenu`

### `sidebar.component.scss`
- Apply fixed positioning and the SAKAI sidebar measurements
- Set width, top/left offsets, background, border radius, and transition
- Style menu groups, links, hover state, and active item state

### `topbar.component.ts`
- Inject `LayoutService` and `AuthService`
- Toggle sidebar visibility from the hamburger button
- Expose a computed `userInitial` signal for the avatar
- Show current user information and trigger logout

### `topbar.component.scss`
- Apply fixed topbar positioning
- Define left branding region and right user action layout
- Match SAKAI spacing, border, and background treatment

## TNTT-specific implementation notes

- Keep the SAKAI measurements unchanged for consistency: `4rem` topbar, `20rem` sidebar, `22rem` desktop content offset.
- Use Vietnamese navigation labels in the UI.
- Keep the menu implementation lightweight with custom links and `routerLinkActive`.
- The layout should integrate cleanly with PrimeNG components and Tailwind CSS utilities, while the shell structure remains SCSS-driven.

## Recommended shell composition

```text
ShellComponent
├── app-topbar
├── app-sidebar
├── .layout-mask
└── .layout-main-container
    └── .layout-main
        └── router-outlet
```

This structure keeps layout state centralized in `LayoutService` while each UI piece owns its own markup and styling.
