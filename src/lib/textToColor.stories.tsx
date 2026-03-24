/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { textToColor } from '@thanh-libs/utils';
import { ThemeSchema } from '../index';

// ─── Helpers ─────────────────────────────────────────────

/** Get contrast text for hsl colors */
const getContrastFromHsl = (hsl: string): string => {
  const match = hsl.match(/hsl\(\s*\d+\s*,\s*\d+%\s*,\s*(\d+)%\s*\)/);
  if (!match) return '#212121';
  const lightness = parseInt(match[1], 10);
  return lightness < 50 ? '#fff' : '#212121';
};

// ─── Demo Component ──────────────────────────────────────

interface TextToColorDemoProps {
  /** Input text */
  text: string;
}

const TextToColorDemo = ({ text }: TextToColorDemoProps) => {
  const theme = useTheme() as ThemeSchema;
  const color = textToColor(text);
  const contrastText = getContrastFromHsl(color);

  return (
    <div css={css`
      font-family: ${theme.font?.fontFamily};
      padding: 1.5rem;
      max-width: 640px;
    `}>
      <h1 css={css`font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem;`}>
        textToColor() — String → HSL Color
      </h1>

      {/* ── Result Card ── */}
      <div css={css`
        border-radius: ${theme.shape?.borderRadiusMedium};
        border: 1px solid ${theme.palette?.divider};
        overflow: hidden;
        margin-bottom: 1.5rem;
      `}>
        {/* Color preview */}
        <div css={css`
          height: 120px;
          background: ${color};
          display: flex;
          align-items: center;
          justify-content: center;
        `}>
          <span css={css`
            font-size: 2.5rem;
            font-weight: 700;
            color: ${contrastText};
            letter-spacing: 4px;
          `}>
            {text.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase()).slice(0, 2).join('')}
          </span>
        </div>

        {/* Result value */}
        <div css={css`
          padding: 1rem;
          background: ${theme.palette?.background?.secondary};
        `}>
          <code css={css`
            font-family: 'Fira Code', monospace;
            font-size: 0.875rem;
            color: ${theme.palette?.primary?.dark};
          `}>
            textToColor('{text}') → <strong>{color}</strong>
          </code>
        </div>
      </div>
    </div>
  );
};

// ─── Name Grid ───────────────────────────────────────────

const NameGridDemo = () => {
  const theme = useTheme() as ThemeSchema;

  const names = [
    'Quốc Thành', 'Alice Smith', 'Bob Johnson', 'Charlie Brown',
    'Diana Prince', 'Eve Wilson', 'Frank Castle', 'Grace Hopper',
    'Hùng Nguyễn', 'Iron Man', 'Jane Doe', 'Kevin Hart',
    'Lý Minh', 'Nancy Drew', 'Oscar Wilde', 'Peter Parker',
  ];

  return (
    <div css={css`
      font-family: ${theme.font?.fontFamily};
      padding: 1.5rem;
      max-width: 640px;
    `}>
      <h1 css={css`font-size: 1.25rem; font-weight: 700; margin-bottom: 0.75rem;`}>
        Tất cả tên → màu tự động
      </h1>
      <p css={css`font-size: 0.875rem; opacity: 0.6; margin-bottom: 1.25rem;`}>
        Mỗi tên luôn cho ra cùng một màu — deterministic hashing
      </p>

      <div css={css`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 12px;
      `}>
        {names.map((name) => {
          const color = textToColor(name);
          const contrastText = getContrastFromHsl(color);
          const initials = name.split(/\s+/).map(w => w.charAt(0).toUpperCase()).slice(0, 2).join('');

          return (
            <div key={name} css={css`text-align: center;`}>
              <div css={css`
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background: ${color};
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 8px;
                transition: transform 0.15s ease;
                &:hover { transform: scale(1.1); }
              `}>
                <span css={css`
                  font-size: 1.125rem;
                  font-weight: 700;
                  color: ${contrastText};
                  letter-spacing: 1px;
                `}>{initials}</span>
              </div>
              <div css={css`font-size: 0.75rem; font-weight: 500;`}>{name}</div>
              <div css={css`font-size: 0.625rem; opacity: 0.5; font-family: 'Fira Code', monospace;`}>{color}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Interactive Input ───────────────────────────────────

const InteractiveDemo = () => {
  const theme = useTheme() as ThemeSchema;
  const [text, setText] = useState('Quốc Thành');
  const color = textToColor(text);
  const contrastText = getContrastFromHsl(color);
  const initials = text.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase()).slice(0, 2).join('');

  return (
    <div css={css`
      font-family: ${theme.font?.fontFamily};
      padding: 1.5rem;
      max-width: 480px;
    `}>
      <h1 css={css`font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem;`}>
        🎛️ Gõ tên bất kỳ
      </h1>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập tên..."
        css={css`
          width: 100%;
          padding: 10px 14px;
          font-size: 1rem;
          border-radius: ${theme.shape?.borderRadius};
          border: 1px solid ${theme.palette?.divider};
          font-family: inherit;
          margin-bottom: 1.25rem;
          box-sizing: border-box;
          &:focus {
            outline: none;
            border-color: ${theme.palette?.primary?.main ?? '#1890ff'};
            box-shadow: 0 0 0 3px ${color}33;
          }
        `}
      />

      {/* Avatar preview */}
      <div css={css`
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        padding: 1.25rem;
        border-radius: ${theme.shape?.borderRadiusMedium};
        border: 1px solid ${theme.palette?.divider};
      `}>
        <div css={css`
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: ${color};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s ease;
        `}>
          <span css={css`
            font-size: 1.25rem;
            font-weight: 700;
            color: ${contrastText};
          `}>{initials || '?'}</span>
        </div>
        <div>
          <div css={css`font-size: 1rem; font-weight: 600;`}>{text || '...'}</div>
          <div css={css`
            font-size: 0.75rem;
            font-family: 'Fira Code', monospace;
            opacity: 0.6;
            margin-top: 2px;
          `}>{color}</div>
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
        textToColor('{text}') = <strong>{color}</strong>
      </code>
    </div>
  );
};

// ─── Story Meta ──────────────────────────────────────────

const meta: Meta<TextToColorDemoProps> = {
  title: 'Utils/textToColor',
  component: TextToColorDemo,
  argTypes: {
    text: {
      control: 'text',
      description: 'Chuỗi đầu vào — băm thành màu HSL nhất quán',
    },
  },
  args: {
    text: 'Quốc Thành',
  },
};

export default meta;
type Story = StoryObj<TextToColorDemoProps>;

/** Default — demo cơ bản */
export const Default: Story = {};

/** Tên tiếng Anh */
export const EnglishName: Story = {
  args: { text: 'Alice Smith' },
};

/** Grid hiển thị nhiều tên → nhiều màu */
export const NameGrid: Story = {
  render: () => <NameGridDemo />,
};

/** Gõ tên tương tác — xem màu thay đổi realtime */
export const InteractivePicker: Story = {
  render: () => <InteractiveDemo />,
};
