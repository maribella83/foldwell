/**
 * Design tokens: the single source of truth for colors, type, spacing and sizes.
 * Screens never hardcode a hex value or font name. They read from here.
 *
 * Later, the Notebook looks (Soft Collage, Oat and Ink) and an optional dark
 * mode become extra palettes with the same shape as `palette` below.
 */

export const palette = {
  ink: '#2C2C2A',
  softInk: '#5F5E5A',
  paper: '#FBFAF6',
  white: '#FFFFFF',

  // Note Box (ages 4–8)
  kidBackground: '#FFF7EC',
  kraft: '#C9A06B',
  kraftLid: '#A9824F',
} as const;

/** Each note type has a paper color and a text color that reads well on it. */
export const noteColors = {
  parent: { background: '#FAEEDA', text: '#5A3A12' },
  folded: { background: '#E1F5EE', text: '#0F5547' },
  reply: { background: '#FBEAF0', text: '#7A2448' },
} as const;

export type NoteKind = keyof typeof noteColors;

/**
 * Font family names. These strings must match the keys passed to useFonts()
 * in src/theme/fonts.ts.
 *
 * - Lora: notes (warm, handwritten-letter feel)
 * - Nunito: buttons, controls, and notes for ages 4–8 (rounded, easy to read)
 * - DM Mono: small labels in the teen Notebook look
 */
export const fonts = {
  note: 'Lora_400Regular',
  noteItalic: 'Lora_400Regular_Italic',
  noteBold: 'Lora_600SemiBold',

  ui: 'Nunito_400Regular',
  uiSemiBold: 'Nunito_600SemiBold',
  uiBold: 'Nunito_700Bold',
  uiExtraBold: 'Nunito_800ExtraBold',

  label: 'DMMono_400Regular',
  labelMedium: 'DMMono_500Medium',
} as const;

/** Type sizes in points. Kid sizes are deliberately large. */
export const fontSize = {
  label: 12,
  small: 14,
  body: 17,
  note: 20,
  title: 28,
  kidBody: 24,
  kidTitle: 34,
} as const;

/** 4-point spacing scale. */
export const space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
  pill: 999,
} as const;

/** Minimum touch target sizes, in points. */
export const touchTarget = {
  /** Apple's minimum; fine for parents and teens. */
  standard: 44,
  /** Ages 4–8. Non-negotiable. */
  kid: 56,
  /** The big "hear Mom/Dad's voice" play button. */
  kidPrimary: 88,
} as const;

export const theme = {
  palette,
  noteColors,
  fonts,
  fontSize,
  space,
  radius,
  touchTarget,
} as const;

export type Theme = typeof theme;
