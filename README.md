# @thanhdq/theme

Theme provider and schema for System Core UI.

## Installation

```bash
yarn add @thanhdq/theme
```

## Usage

```tsx
import { ThemeProvider } from '@thanhdq/theme';
import type { ThemeSchema } from '@thanhdq/theme';

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

Run `nx test @thanhdq/theme` to execute the unit tests via [Vitest](https://vitest.dev/).
