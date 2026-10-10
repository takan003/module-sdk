/**
 * 契約常數與白名單快照（規格：docs/模組市集與外掛開發.md §3.2、§6.3）。
 * 快照型：宿主改公開面時同步更新並遞增 HOST_SURFACE_SNAPSHOT。
 */

/** 契約版本：與 manifest.contractVersion 比對，過新即拒絕 */
export const MODULE_CONTRACT_VERSION = 1;

/** 本 SDK 對應的宿主介面快照版本（對應主程式版本） */
export const HOST_SURFACE_SNAPSHOT = "0.389";

/** 頁面前綴白名單（無此四前綴之一即無 proxy 角色閘門）【E13】 */
export const PAGE_PREFIXES = ["/admin", "/student", "/parent", "/staff"];

/** 宿主允許的掛勾（未宣告過的掛勾＝警示可安裝）【E9】 */
export const KNOWN_HOOKS = ["announcements", "calendar"];

/** 掛勾集合豁免：宣告 dataCollections 時自動含入，不需也不可自行直寫 */
export const HOOK_COLLECTIONS = ["announcements", "calendarEvents"];

/** 內建／管理端模組代碼快照（value 撞名即拒絕） */
export const BUILTIN_VALUES = [
  "account",
  "activity",
  "announcements",
  "calendar",
  "classes",
  "modules",
  "roster",
  "schoolSettings",
  "settings",
  "stats",
  "users",
];

/** 套件體積上限（bytes）：市集第一期上限 500KB（§九-3） */
export const PACKAGE_SIZE_LIMIT = 500 * 1024;

/**
 * 允許 import 的宿主路徑（§3.3 允許面快照）。
 * 僅列前綴；`@/lib/announcements` 僅允 publishFromModule（其餘由掃描規則 3 概略把關）。
 */
export const ALLOWED_HOST_IMPORTS = [
  "@/lib/dal",
  "@/lib/audit",
  "@/lib/csrf",
  "@/lib/rate-limit",
  "@/lib/firebase-admin",
  "@/lib/read-cache",
  "@/lib/list-cache",
  "@/lib/api-error",
  "@/lib/announcements",
  "@/lib/calendar",
  "@/lib/module-gate",
  "@/types/feature-modules",
  "@/components/AdminSectionShell",
  "@/components/ModuleIcon",
];

/** 明確禁止的宿主核心檔（§6.3-1：註冊表寫入面、設定層、圖示表等） */
export const FORBIDDEN_HOST_IMPORTS = [
  "@/types/modules",
  "@/lib/settings-server",
  "@/lib/role-settings",
  "@/lib/feature-modules", // server 端（寫入面）；唯讀需求走 @/types/feature-modules
  "@/lib/firebase", // 客戶端 Firebase 初始化歸宿主
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
