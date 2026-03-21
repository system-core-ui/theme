# @thanh-libs/theme

Theme provider and schema for System Core UI.

## Installation

```bash
yarn add @thanh-libs/theme
```

## Usage

```tsx
import { ThemeProvider } from '@thanh-libs/theme';
import type { ThemeSchema } from '@thanh-libs/theme';

const myTheme: ThemeSchema = {
  palette: { ... },
  typography: { ... },
  spacing: { ... },
};

<ThemeProvider theme={myTheme}>
  <App />
</ThemeProvider>
```

## Running unit tests

Run `nx test @thanh-libs/theme` to execute the unit tests via [Vitest](https://vitest.dev/).
