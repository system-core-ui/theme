import '@emotion/react';

import type { Colors } from '../constants/colors';

import type { Fonts } from './fonts';
import type { Palettes } from './palettes';
import type { Shadows } from './shadows';
import type { Shapes } from './shapes';
import type { Spacing } from './spacing';
import type { Typography } from './typography';
import type { ZIndex } from './zIndex';

export interface ThemeSchema {
  palette?: Palettes;
  shape?: Shapes;
  zIndex?: ZIndex;
  font?: Fonts;
  typography?: Typography;
  spacing?: Spacing;
  shadows?: Shadows[];
  colors?: Colors;
  common?: Record<string, any>;
  [key: string]: any;
}

export type {
  Shadows,
  Palettes,
  Shapes,
  ZIndex,
  Fonts,
  Typography,
  Spacing,
  Colors,
};
export default ThemeSchema;
