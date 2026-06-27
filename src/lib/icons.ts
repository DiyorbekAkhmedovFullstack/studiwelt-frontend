/**
 * Central icon registry for the whole platform.
 *
 * House icon set: Tabler Icons (https://tabler.io/icons) — outline style on a
 * 24×24 grid with a 2px stroke, matching the platform's visual language.
 *
 * Rules
 * -----
 * 1. Import icons from THIS file only — never from '@tabler/icons-react'
 *    directly. This keeps every glyph declared exactly once.
 * 2. Each semantic name below maps to a UNIQUE Tabler glyph. Do not point two
 *    different semantic names at the same icon — pick another glyph instead.
 * 3. Exception: a small set of pure utility icons (arrow, check, close…) are
 *    intentionally shared across the UI and are grouped under `Ui`.
 *
 * All icons accept Tabler's props: `size`, `stroke`, `color`, `className`.
 */

import {
  // Utility / directional (shared by design)
  IconArrowRight,
  IconCheck,
  IconX,
  // About-Studienkolleg — journey steps
  IconFileText,
  IconPencil,
  IconBooks,
  IconCertificate,
  IconBuildingBank,
  // About-Studienkolleg — "why" cards
  IconBuildingBridge,
  IconLanguage,
  IconRoute,
  // About-Studienkolleg — requirements
  IconMessages,
  IconFileDescription,
  IconCoin,
  IconCalendarEvent,
} from '@tabler/icons-react';

export type { Icon as TablerIcon, IconProps } from '@tabler/icons-react';

/** Pure utility icons — intentionally reused across the platform. */
export const Ui = {
  ArrowRight: IconArrowRight,
  Check: IconCheck,
  Close: IconX,
} as const;

/**
 * Semantic icons. Each one is a distinct glyph used for a single concept —
 * adding a new concept means adding a new, unused Tabler glyph here.
 */
export const Icon = {
  // — Journey roadmap —
  Application: IconFileText,
  EntranceExam: IconPencil,
  Semesters: IconBooks,
  Assessment: IconCertificate,
  University: IconBuildingBank,

  // — Why Studienkolleg —
  BridgeEducation: IconBuildingBridge,
  AcademicGerman: IconLanguage,
  RecognisedPath: IconRoute,

  // — Requirements —
  LanguageReq: IconMessages,
  Documents: IconFileDescription,
  Finances: IconCoin,
  Timeline: IconCalendarEvent,
} as const;
