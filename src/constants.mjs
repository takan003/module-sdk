/**
 * 契約常數與白名單快照（規格：docs/模組市集與外掛開發.md §3.2、§6.3）。
 * 快照型：宿主改公開面時同步更新並遞增 HOST_SURFACE_SNAPSHOT。
 */

/** 契約版本：與 manifest.contractVersion 比對，過新即拒絕 */
export const MODULE_CONTRACT_VERSION = 1;

/**
 * 本 SDK 目前 snapshots/ 實際對應的宿主版本。
 * 由 `bin/module-snapshot-gen.mjs --host <campus-toolkit>` 自動更新。
 */
export const HOST_SURFACE_SNAPSHOT = "0.656";

/** module:check 預設比對的宿主版本（allowlist 與 snapshots 已對齊；此值跟隨主程式目前版本） */
export const DEFAULT_HOST_VERSION = "0.656";

/** 頁面前綴白名單（無此四前綴之一即無 proxy 角色閘門）【E13】 */
export const PAGE_PREFIXES = ["/admin", "/student", "/parent", "/staff"];

/** 宿主允許的掛勾（未宣告過的掛勾＝警示可安裝）【E9】 */
export const KNOWN_HOOKS = ["announcements", "calendar"];

/** 掛勾集合豁免：宣告 dataCollections 時自動含入，不需也不可自行直寫 */
export const HOOK_COLLECTIONS = ["announcements", "calendarEvents"];

/** 宿主保留集合：模組不得宣告或直接存取（P0-2） */
export const RESERVED_COLLECTIONS = ["users", "settings", "activityLog", "revokedJTIs"];

/** 核心個資集合：可讀不可寫（P0-2 v2） */
export const CORE_READ_ONLY_COLLECTIONS = [
  "rosterStudents",
  "rosterParents",
  "rosterStaff",
  "rosterAdmins",
  "studentPersonalInfo",
  "studentPersonalIdentity",
  "studentPersonalPhoto",
];

/** 內建／管理端模組代碼快照（value 撞名即拒絕） */
export const BUILTIN_VALUES = [
  "account",
  "activity",
  "announcements",
  "calendar",
  "classes",
  "miscSettings",
  "modules",
  "recreation",
  "roster",
  "schoolSettings",
  "settings",
  "stats",
  "themeMarket",
  "users",
];

/** 套件體積上限（bytes）：市集第一期上限 500KB（§九-3） */
export const PACKAGE_SIZE_LIMIT = 500 * 1024;

/**
 * 允許 import 的宿主路徑（v1 以 A 與 E／F／G 的實際 import 為準）。
 * B 是衍生工具；若 E／F／G 使用新的宿主公開面，先更新本清單與 snapshots，不是改模組。
 */
export const ALLOWED_HOST_IMPORTS = [
  "@/lib/dal",
  "@/lib/firebase-admin",
  "@/lib/csrf",
  "@/lib/rate-limit",
  "@/lib/audit",
  "@/lib/read-cache",
  "@/lib/list-cache",
  "@/lib/announcements",
  "@/lib/calendar",
  "@/lib/module-gate",
  "@/lib/module-db",
  "@/lib/module-host-data",
  "@/lib/settings-client",
  "@/lib/settings-server",
  "@/lib/session",
  "@/lib/data-saver",
  "@/lib/feature-modules",
  "@/lib/roster",
  "@/types/feature-modules",
  "@/types/settings",
  "@/types/users",
  "@/types/announcements",
  "@/types/calendar",
  "@/types/personal-info",
  "@/types/roster",
  "@/components/AdminSectionShell",
  "@/components/ModuleIcon",
  "@/components/AdSense",
  "@/components/Copyright",
  "@/components/DisclosureArrow",
  "@/components/RevealListCard",
  "@/components/Toast",
  "@/components/RoleLayout",
  "@/components/RolePageShell",
];

/** 明確禁止的宿主核心檔（v1 只保留真正不該由模組碰的寫入面） */
export const FORBIDDEN_HOST_IMPORTS = [
  "@/types/modules",
  "@/types/modules.generated",
  "@/lib/role-settings",
  "@/lib/firebase", // 客戶端 Firebase 初始化歸宿主
  "@/app/api/settings",
  "@/app/admin/modules",
];

/** 允許 import 的 npm 套件（主程式既有依賴白名單快照【E10】）；副檔名/子路徑另以 prefix 處理 */
export const ALLOWED_NPM_PACKAGES = [
  "bcryptjs",
  "firebase",
  "firebase-admin",
  "jose",
  "next",
  "nodemailer",
  "qrcode",
  "react",
  "react-dom",
  "server-only",
  "xlsx",
];

/** npm 子路徑前綴（`next/server` 等與主包同等看待） */
export const ALLOWED_NPM_PREFIXES = [
  "firebase/",
  "next/",
  "react/",
  "react-dom/",
  "node:",
];

/** 目前已知的宿主路由快照（撞名即拒絕；不完整屬快照限制，安裝端⑨仍會全量比對） */
export const HOST_ROUTES = [
  { kind: "page", path: "/admin/announcements" },
  { kind: "page", path: "/admin/calendar" },
  { kind: "page", path: "/admin/modules" },
  { kind: "page", path: "/admin/stats" },
  { kind: "page", path: "/admin/activity" },
  { kind: "page", path: "/admin/users" },
  { kind: "page", path: "/admin/roster" },
  { kind: "page", path: "/admin/classes" },
  { kind: "page", path: "/admin/school-settings" },
  { kind: "api", path: "/api/admin/announcements" },
  { kind: "api", path: "/api/admin/calendar" },
  { kind: "api", path: "/api/admin/feature-modules" },
  { kind: "api", path: "/api/auth/login" },
  { kind: "api", path: "/api/auth/me" },
  { kind: "api", path: "/api/settings" },
];
