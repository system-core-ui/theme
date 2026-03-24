/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { pxToRem } from '@thanh-libs/utils';
import { ThemeSchema } from '../index';

// ─── Demo Component ──────────────────────────────────────

interface PxToRemDemoProps {
  /** Pixel value to convert */
  px: number;
  /** Base font size (html root) */
  htmlFontSize: number;
}

const PxToRemDemo = ({ px, htmlFontSize }: PxToRemDemoProps) => {
  const theme = useTheme() as ThemeSchema;
  const result = pxToRem(px, htmlFontSize);

  return (
    <div css={css`
      font-family: ${theme.font?.fontFamily};
      padding: 1.5rem;
      max-width: 640px;
    `}>
      <h1 css={css`font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem;`}>
        pxToRem() — Pixel → REM
      </h1>

      {/* ── Result Card ── */}
      <div css={css`
        border-radius: ${theme.shape?.borderRadiusMedium};
        border: 1px solid ${theme.palette?.divider};
        overflow: hidden;
        margin-bottom: 1.5rem;
      `}>
        {/* Visual comparison */}
        <div css={css`
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        `}>
          <div css={css`text-align: center;`}>
            <div css={css`
              width: ${px}px;
              height: ${px}px;
              max-width: 200px;
              max-height: 200px;
              background: ${theme.palette?.primary?.main ?? '#1890ff'};
              border-radius: ${theme.shape?.borderRadius};
              transition: all 0.2s ease;
            `} />
            <span css={css`font-size: 0.75rem; opacity: 0.6; margin-top: 6px; display: block;`}>
              {px}px
            </span>
          </div>
          <span css={css`font-size: 1.5rem; font-weight: 300; opacity: 0.3;`}>→</span>
          <div css={css`text-align: center;`}>
            <div css={css`
              width: ${result};
              height: ${result};
              max-width: 200px;
              max-height: 200px;
              background: ${theme.palette?.success?.main ?? '#52c41a'};
              border-radius: ${theme.shape?.borderRadius};
              transition: all 0.2s ease;
            `} />
            <span css={css`font-size: 0.75rem; opacity: 0.6; margin-top: 6px; display: block;`}>
              {result}
            </span>
          </div>
        </div>

        {/* Result value */}
        <div css={css`
          padding: 1rem;
          background: ${theme.palette?.background?.secondary};
          display: flex;
          align-items: center;
          gap: 1rem;
        `}>
          <code css={css`
            font-family: 'Fira Code', monospace;
            font-size: 0.875rem;
            color: ${theme.palette?.primary?.dark};
          `}>
            pxToRem({px}, {htmlFontSize}) → <strong>{result}</strong>
          </code>
        </div>
      </div>

      {/* ── Conversion table ── */}
      <h2 css={css`font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem; opacity: 0.6;`}>
        Bảng chuyển đổi (base: {htmlFontSize}px)
      </h2>
      <div css={css`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 8px;
      `}>
        {[4, 8, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64].map((val) => (
          <div key={val} css={css`
            padding: 10px;
            border-radius: ${theme.shape?.borderRadius};
            border: 1px solid ${val === px ? (theme.palette?.primary?.main ?? '#1890ff') : (theme.palette?.divider ?? '#e8e8e8')};
            background: ${val === px ? `${theme.palette?.primary?.main ?? '#1890ff'}10` : 'transparent'};
            text-align: center;
            transition: all 0.15s;
          `}>
            <div css={css`font-size: 0.75rem; opacity: 0.6;`}>{val}px</div>
            <div css={css`
              font-size: 0.875rem;
              font-weight: 600;
              font-family: 'Fira Code', monospace;
              color: ${theme.palette?.text?.primary};
            `}>
              {pxToRem(val, htmlFontSize)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Interactive Slider ───────────────────────────────────

const InteractiveDemo = () => {
  const theme = useTheme() as ThemeSchema;
  const [px, setPx] = useState(16);
  const [base, setBase] = useState(14);
  const result = pxToRem(px, base);

  return (
    <div css={css`
      font-family: ${theme.font?.fontFamily};
      padding: 1.5rem;
      max-width: 480px;
    `}>
      <h1 css={css`font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem;`}>
        🎛️ Tự chỉnh px & base
      </h1>

      <div css={css`display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.25rem;`}>
        <label css={css`font-size: 0.875rem; display: flex; flex-direction: column; gap: 4px;`}>
          Pixel: <strong>{px}px</strong>
          <input
            type="range" min={0} max={100} step={1}
            value={px}
            onChange={(e) => setPx(parseInt(e.target.value))}
            css={css`width: 100%;`}
          />
        </label>
        <label css={css`font-size: 0.875rem; display: flex; flex-direction: column; gap: 4px;`}>
          Base font-size: <strong>{base}px</strong>
          <input
            type="range" min={10} max={24} step={1}
            value={base}
            onChange={(e) => setBase(parseInt(e.target.value))}
            css={css`width: 100%;`}
          />
        </label>
      </div>

      {/* Visual preview */}
      <div css={css`
        display: flex;
        align-items: end;
        gap: 1.5rem;
        margin-bottom: 1rem;
        padding: 1.5rem;
        border-radius: ${theme.shape?.borderRadiusMedium};
        border: 1px solid ${theme.palette?.divider};
      `}>
        <div css={css`
          width: ${px}px;
          height: ${px}px;
          max-width: 100px;
          max-height: 100px;
          min-width: 4px;
          min-height: 4px;
          background: ${theme.palette?.primary?.main ?? '#1890ff'};
          border-radius: 4px;
          transition: all 0.15s ease;
          flex-shrink: 0;
        `} />
        <div css={css`
          font-size: ${result};
          line-height: 1;
          font-weight: 700;
          color: ${theme.palette?.text?.primary};
          transition: font-size 0.15s ease;
        `}>
          Aa
        </div>
      </div>

      <code css={css`
        font-size: 0.875rem;
        font-family: 'Fira Code', monospace;
        color: ${theme.palette?.primary?.dark};
        display: block;
        padding: 10px 14px;
        background: ${theme.palette?.background?.secondary};
        border-radius: ${theme.shape?.borderRadius};
      `}>
        pxToRem({px}, {base}) = <strong>{result}</strong>
      </code>
    </div>
  );
};

// ─── Story Meta ──────────────────────────────────────────

const meta: Meta<PxToRemDemoProps> = {
  title: 'Utils/pxToRem',
  component: PxToRemDemo,
  argTypes: {
    px: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Giá trị pixel cần convert',
    },
    htmlFontSize: {
      control: { type: 'range', min: 10, max: 24, step: 1 },
      description: 'Base font-size của html root (mặc định 14px)',
    },
  },
  args: {
    px: 16,
    htmlFontSize: 14,
  },
};

export default meta;
type Story = StoryObj<PxToRemDemoProps>;

/** Default — convert 16px với base 14 */
export const Default: Story = {};

/** Base 16 — nhiều framework dùng 16px */
export const Base16: Story = {
  args: { px: 32, htmlFontSize: 16 },
};

/** Tương tác tự do — kéo slider để thấy kết quả */
export const InteractivePicker: Story = {
  render: () => <InteractiveDemo />,
};
