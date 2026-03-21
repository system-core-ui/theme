# @thanh-libs/theme

A design-system theme library built on [Emotion](https://emotion.sh), providing a complete theming solution with **light/dark presets**, **global CSS reset**, **color palette**, **typography**, **spacing**, and **shadows**.

## Requirements

| Peer Dependency | Version |
|-----------------|---------|
| `react` | `>=18.0.0` |
| `react-dom` | `>=18.0.0` |
| `@emotion/react` | `>=11.0.0` |
| `@emotion/styled` | `>=11.0.0` |
| `@thanh-libs/utils` | `>=0.0.4` |

## Installation

```bash
npm install @thanh-libs/theme @emotion/react @emotion/styled @thanh-libs/utils
```

## Quick Start

Wrap your app with `ThemeProvider`:

```tsx
import { ThemeProvider } from '@thanh-libs/theme';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

The `ThemeProvider` automatically:
- Applies `THEME_DEFAULT` (light theme)
- Injects `GlobalStyles` (CSS reset, scrollbar, font defaults)
- Extends Emotion's `Theme` type for full TypeScript support

## Exports

### Components

#### `ThemeProvider`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Child components |
| `theme` | `ThemeSchema` | `THEME_DEFAULT` | Custom theme override (merged with default) |

```tsx
import { ThemeProvider, THEME_DARK } from '@thanh-libs/theme';

// Use dark theme
<ThemeProvider theme={THEME_DARK}>
  <App />
</ThemeProvider>

// Use custom overrides
<ThemeProvider theme={{ palette: { primary: { main: '#FF5722' } } }}>
  <App />
</ThemeProvider>
```

#### `GlobalStyles`

Automatically injected by `ThemeProvider`. Applies:
- HTML font size from theme
- Body reset (margin, padding, font, color)
- Link & button reset
- Scrollbar styling (WebKit)
- Focus-visible outline

### Theme Presets

| Export | Description |
|--------|-------------|
| `THEME_DEFAULT` | Light theme preset |
| `THEME_DARK` | Dark theme preset |

### Accessing Theme in Components

Use Emotion's `useTheme` hook:

```tsx
import { useTheme } from '@emotion/react';
import type { ThemeSchema } from '@thanh-libs/theme';

const MyComponent = () => {
  const theme: ThemeSchema = useTheme();
  return <div style={{ color: theme.palette?.primary?.main }}>Hello</div>;
};
```

Or with Emotion's `styled`:

```tsx
import styled from '@emotion/styled';

const Button = styled.button`
  background: ${({ theme }) => theme.palette?.primary?.main};
  color: ${({ theme }) => theme.palette?.common?.white};
  border-radius: ${({ theme }) => theme.shape?.borderRadius};
  padding: ${({ theme }) => theme.spacing?.small} ${({ theme }) => theme.spacing?.large};
`;
```

## Theme Schema

```typescript
interface ThemeSchema {
  palette?: Palettes;      // Color system
  shape?: Shapes;          // Border radius
  zIndex?: ZIndex;         // Z-index layers
  font?: Fonts;            // Base font settings
  typography?: Typography; // Heading & body text styles
  spacing?: Spacing;       // Spacing scale
  shadows?: Shadows[];     // Shadow presets (10 levels)
  colors?: Colors;         // Full color palette
  common?: Record<string, any>;
}
```

### Palette

Semantic color groups, each with `main`, `light`, `dark`, `extraLight`, `borderLine`, `boxShadow` variants:

| Group | Purpose |
|-------|---------|
| `primary` | Primary brand color (Blue) |
| `secondary` | Secondary color (Grey) |
| `error` | Error states (Red) |
| `success` | Success states (Green) |
| `warning` | Warning states (Yellow) |
| `info` | Info states (Blue) |
| `disabled` | Disabled states |
| `background` | Page backgrounds + overlay |
| `scrollBar` | Scrollbar colors |
| `common` | `black` and `white` |
| `divider` | Divider line color |

### Spacing

| Token | Value |
|-------|-------|
| `tiny` | 4px |
| `small` | 8px |
| `medium` | 12px |
| `large` | 16px |
| `extraLarge` | 24px |

### Shape

| Token | Value |
|-------|-------|
| `borderRadiusTiny` | 4px |
| `borderRadius` | 6px |
| `borderRadiusMedium` | 8px |
| `circle` | 50% |

### Typography

| Variant | Size | Weight | Line Height |
|---------|------|--------|-------------|
| `h1` | 38px | 700 | 1.2 |
| `h2` | 30px | 700 | 1.3 |
| `h3` | 24px | 600 | 1.4 |
| `h4` | 20px | 600 | 1.5 |
| `h5` | 16px | 600 | 1.5 |
| `body` | 14px | 400 | 1.6 |

### Z-Index

| Layer | Value |
|-------|-------|
| `dialogs` | 1201 |
| `drawer` | 1200 |
| `modal` | 1300 |
| `alert` | 1400 |
| `popover` | 1500 |
| `tooltip` | 1501 |

### Color Palette

8 hues × 15 shades each (1 = lightest → 15 = darkest):

`BLUE` · `RED` · `GREEN` · `ORANGE` · `YELLOW` · `GREY` · `PURPLE` · `BROWN` · `CYAN`

Access via `COLOR` constant:

```tsx
import { COLOR } from '@thanh-libs/theme';

COLOR.BLUE_7;   // '#1890FF' — primary blue
COLOR.RED_8;    // '#F5222D' — error red
COLOR.GREY_13;  // '#262626' — near-black
```

## License

MIT
