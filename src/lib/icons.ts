/**
 * Central icon registry for the whole platform.
 *
 * House icon set: Tabler Icons (https://tabler.io/icons) — outline style on a
 * 24×24 grid with a 2px stroke, matching the platform's visual language.
 *
 * Rules
 * -----
 * 1. Import icons from THIS file only — never from '@tabler/icons-react'
 *    directly (an ESLint rule enforces this). Keeps every glyph declared once.
 * 2. Each semantic name under `Icon` maps to a UNIQUE Tabler glyph. Do not
 *    point two different concepts at the same icon — pick another glyph.
 * 3. Exception: pure utility/directional icons (arrow, check, chevron, lock…)
 *    are intentionally shared across the UI and live under `Ui`.
 *
 * All icons accept Tabler's props: `size`, `stroke`, `color`, `className`.
 */

import {
  // — Utility / directional (shared by design) —
  IconArrowRight,
  IconArrowLeft,
  IconChevronRight,
  IconChevronLeft,
  IconChevronDown,
  IconChevronUp,
  IconArrowUp,
  IconArrowsMinimize,
  IconArrowsMaximize,
  IconCheck,
  IconX,
  IconLock,
  IconPointFilled,
  IconPlus,
  IconMinus,
  IconExternalLink,
  IconLoader2,
  IconPlayerPlayFilled,
  // — Journey / Studienkolleg —
  IconFileText,
  IconPencil,
  IconBooks,
  IconCertificate,
  IconBuildingBank,
  IconBuildingBridge,
  IconLanguage,
  IconRoute,
  IconMessages,
  IconFileDescription,
  IconCoin,
  IconCalendarEvent,
  // — Lesson sections (domain) —
  IconCards,
  IconTextGrammar,
  IconBook,
  IconListCheck,
  // — Status / feedback —
  IconCircleCheck,
  IconInfoCircle,
  IconAlertTriangle,
  IconAlertCircle,
  IconRefresh,
  IconBulb,
  IconTrophy,
  IconFlame,
  IconStar,
  IconStarFilled,
  IconClock,
  IconTargetArrow,
  // — Account / nav —
  IconUser,
  IconMail,
  IconEye,
  IconEyeOff,
  IconSettings,
  IconLogout,
  IconMenu2,
  IconSearch,
  IconShieldLock,
  IconKey,
  IconBell,
  // — Places / misc —
  IconMapPin,
  IconWorld,
  IconBuildingCommunity,
  IconSchool,
  IconCreditCard,
  IconActivity,
  IconFiles,
  IconBolt,
  IconUsers,
  IconRulerMeasure,
  IconMathSymbols,
  IconBook2,
  IconWand,
  IconArrowsDiff,
  IconBan,
  IconArrowsExchange,
  IconId,
  IconActivityHeartbeat,
  IconUserPlus,
  IconLogin,
  IconRocket,
  IconHome,
  IconUpload,
  IconBus,
  IconTrendingUp,
  IconTrendingDown,
  IconNews,
  IconBrandTelegram,
  IconBrandWhatsapp,
} from '@tabler/icons-react';

export type { Icon as TablerIcon, IconProps } from '@tabler/icons-react';

/** Pure utility / directional icons — intentionally reused across the platform. */
export const Ui = {
  ArrowRight: IconArrowRight,
  ArrowLeft: IconArrowLeft,
  ChevronRight: IconChevronRight,
  ChevronLeft: IconChevronLeft,
  ChevronDown: IconChevronDown,
  ChevronUp: IconChevronUp,
  ArrowUp: IconArrowUp,
  Check: IconCheck,
  Close: IconX,
  Lock: IconLock,
  Dot: IconPointFilled,
  Plus: IconPlus,
  Minus: IconMinus,
  ExternalLink: IconExternalLink,
  Spinner: IconLoader2,
  Play: IconPlayerPlayFilled,
} as const;

/**
 * Semantic icons. Each maps to a distinct glyph used for a single concept —
 * adding a new concept means adding a new, unused Tabler glyph here.
 */
export const Icon = {
  // — Journey roadmap / Studienkolleg —
  Application: IconFileText,
  EntranceExam: IconPencil,
  Semesters: IconBooks,
  Assessment: IconCertificate,
  University: IconBuildingBank,
  Math: IconMathSymbols,
  Curriculum: IconBook2,
  Build: IconWand,
  Compare: IconArrowsDiff,
  Restriction: IconBan,
  Switch: IconArrowsExchange,
  BridgeEducation: IconBuildingBridge,
  AcademicGerman: IconLanguage,
  RecognisedPath: IconRoute,
  LanguageReq: IconMessages,
  Documents: IconFileDescription,
  Finances: IconCoin,
  Timeline: IconCalendarEvent,
  Studienkolleg: IconBuildingCommunity,
  School: IconSchool,
  Payment: IconCreditCard,
  Visa: IconId,
  Health: IconActivityHeartbeat,

  // — Lesson sections (domain) —
  Flashcards: IconCards,
  Grammar: IconTextGrammar,
  Reading: IconBook,
  Ctest: IconListCheck,

  // — Landing / features —
  Pacing: IconActivity,
  Resources: IconFiles,
  Bolt: IconBolt,
  Compress: IconArrowsMinimize,
  Expand: IconArrowsMaximize,

  // — Status / feedback —
  Success: IconCircleCheck,
  Info: IconInfoCircle,
  Warning: IconAlertTriangle,
  Error: IconAlertCircle,
  Restart: IconRefresh,
  Tip: IconBulb,
  Trophy: IconTrophy,
  Streak: IconFlame,
  TrendUp: IconTrendingUp,
  TrendDown: IconTrendingDown,
  News: IconNews,
  Star: IconStar,
  StarFilled: IconStarFilled,
  Clock: IconClock,
  Target: IconTargetArrow,

  // — Account / nav —
  User: IconUser,
  Mail: IconMail,
  Reveal: IconEye,
  Hide: IconEyeOff,
  Settings: IconSettings,
  Logout: IconLogout,
  SignUp: IconUserPlus,
  Login: IconLogin,
  Upgrade: IconRocket,
  Menu: IconMenu2,
  Search: IconSearch,
  Security: IconShieldLock,
  Mfa: IconKey,
  Notifications: IconBell,

  // — Places / demographics —
  Location: IconMapPin,
  Country: IconWorld,
  Population: IconUsers,
  Area: IconRulerMeasure,
  Home: IconHome,
  Upload: IconUpload,
  Transit: IconBus,

  // — Social / contact —
  Telegram: IconBrandTelegram,
  Whatsapp: IconBrandWhatsapp,
} as const;
