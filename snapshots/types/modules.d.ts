/**
 * 管理端「權限單位」註冊表（單一來源）。
 *
 * ⚠️ 這裡定義的是管理端的**權限模組**（名冊「指定功能模組」勾的那些），
 * 不是產品層級的功能模組——產品層級（內建／選用、啟用狀態）見 `types/feature-modules.ts`，
 * 本表同時是內建功能模組卡（`types/feature-modules.ts` 的 `ADMIN_FEATURE_MODULES`）的來源。
 *
 * 系統內所有「權限模組」的定義都集中在這裡：
 * - `types/users.ts` 由本表派生 `ADMIN_MODULES`（全部）、`BASE_ADMIN_MODULES`（核心＝scope core）、
 *   `SUPER_ONLY_ADMIN_MODULES`（僅超級＝scope superOnly），進而決定名冊「指定功能模組」的可指派清單、
 *   `adminModulesOf` 的授予結果與 `requireAdminModule` 的 API 守門；
 * - 管理員首頁卡片由本表「有入口路由（href 非空）」的項目派生；
 * - 這些權限單位在「功能模組管理」頁（`/admin/modules`）各列為一張內建模組卡
 *   （產品層級的展示見 `types/feature-modules.ts`）。
 *
 * 欄位約定（每個模組的鍵都要齊，聯合型別才能安全取值）：
 * - `href`：入口路由，空字串＝尚未建頁（如僅 API 已上線的稽核紀錄）；
 * - `children`：子功能入口，空陣列＝無子功能；
 * - `scope`：core／assignable／superOnly——**屬性分級已退役**（政策修改書決議二）：
 *   管員恆全權，adminModulesOf 對任何管理員條目回全量；scope 僅供文件與 UI 分組參考，
 *   不再剝除授予；
 * - `status`：built＝已上線；apiOnly＝API 已上線、頁面未建；planned＝規劃中。
 *
 * 選用（外掛）功能模組的權限單位由 `src/modules/<value>/module.json` 的
 * `permission.mode: "new"` 自動併入（`scripts/build-module-registry.mjs` 產生
 * `modules.generated.ts`）——本檔手刻列只放內建單位，勿另手刻外掛列。
 */
/** 權限單位的分類（帳號／校務資料／系統，供日後依類檢視權限時使用） */
export declare const MODULE_CATEGORIES: readonly ["帳號與權限", "校務資料", "系統與紀錄"];
export type ModuleCategory = (typeof MODULE_CATEGORIES)[number];
/** 權限範圍：核心＝人人具備；可指派＝由超級指派；僅超級＝不開放指派 */
export type ModuleScope = "core" | "assignable" | "superOnly";
/** 實作狀態：已上線／API 已上線頁面未建／規劃中 */
export type ModuleStatus = "built" | "apiOnly" | "planned";
/** 模組底下的子功能入口 */
export interface ModuleChild {
    label: string;
    href: string;
}
export interface ModuleMeta {
    /** 權限代碼（＝`requireAdminModule` 的引數、名冊 `modules` 陣列存的值） */
    value: string;
    /** 中文名稱（同時是名冊匯入時可辨識的標籤） */
    label: string;
    category: ModuleCategory;
    description: string;
    scope: ModuleScope;
    status: ModuleStatus;
    href: string;
    children: readonly ModuleChild[];
}
/**
 * 權限單位註冊表＝手刻內建列 ＋ manifest 產生列（後者來源 `src/modules/<value>/module.json`）。
 * 同代碼不得重複——由 `scripts/build-module-registry.mjs` build 期 fail-fast。
 */
export declare const MODULES: readonly [{
    readonly value: "users";
    readonly label: "使用者帳號管理";
    readonly category: "帳號與權限";
    readonly description: "建立與管理登入帳號、密碼與兩階段驗證，並把帳號對應到各身分名冊。";
    readonly scope: "assignable";
    readonly status: "built";
    readonly href: "/admin/accounts";
    readonly children: readonly [];
}, {
    readonly value: "roster";
    readonly label: "身分名冊管理";
    readonly category: "帳號與權限";
    readonly description: "維護各學期學生、家長、教職員與管理員名冊，並指派管理員的功能模組。";
    readonly scope: "assignable";
    readonly status: "built";
    readonly href: "/admin/roster";
    readonly children: readonly [];
}, {
    readonly value: "settings";
    readonly label: "系統設定";
    readonly category: "系統與紀錄";
    readonly description: "設定系統名稱、承辦聯絡與介面等全域項目（可寫入者僅超級管理員）。";
    readonly scope: "core";
    readonly status: "built";
    readonly href: "/admin/settings";
    readonly children: readonly [];
}, {
    readonly value: "schoolSettings";
    readonly label: "學校基本設定";
    readonly category: "校務資料";
    readonly description: "維護學期起訖、校務基本資料、單位層級、年段班級、各式代碼表、樓層空間與課表作息時間。";
    readonly scope: "superOnly";
    readonly status: "built";
    readonly href: "/admin/school-settings";
    readonly children: readonly [{
        readonly label: "學期起訖設定";
        readonly href: "/admin/school-settings/semesters";
    }, {
        readonly label: "校務基本資料";
        readonly href: "/admin/school-settings/profile";
    }, {
        readonly label: "單位層級設定";
        readonly href: "/admin/school-settings/org";
    }, {
        readonly label: "年段班級設定";
        readonly href: "/admin/school-settings/classes";
    }, {
        readonly label: "各式代碼表";
        readonly href: "/admin/school-settings/codes";
    }, {
        readonly label: "樓層空間設定";
        readonly href: "/admin/school-settings/spaces";
    }, {
        readonly label: "課表作息時間";
        readonly href: "/admin/school-settings/periods";
    }];
}, {
    readonly value: "miscSettings";
    readonly label: "雜項設定";
    readonly category: "校務資料";
    readonly description: "維護其他全校共用設定，例如郵遞區號選項。";
    readonly scope: "superOnly";
    readonly status: "built";
    readonly href: "/admin/misc-settings";
    readonly children: readonly [{
        readonly label: "郵遞區號設定";
        readonly href: "/admin/misc-settings/postal-codes";
    }];
}, {
    readonly value: "classes";
    readonly label: "班級管理";
    readonly category: "校務資料";
    readonly description: "檢視各年級班級清單與每班學生人數（班級結構於學校基本設定維護）。";
    readonly scope: "assignable";
    readonly status: "built";
    readonly href: "/admin/classes";
    readonly children: readonly [];
}, {
    readonly value: "announcements";
    readonly label: "系統公告";
    readonly category: "校務資料";
    readonly description: "發佈與管理校園公告，可依身分與班級設定可見範圍；其他模組可經接口掛勾發文。";
    readonly scope: "assignable";
    readonly status: "built";
    readonly href: "/admin/announcements";
    readonly children: readonly [];
}, {
    readonly value: "calendar";
    readonly label: "行事曆";
    readonly category: "校務資料";
    readonly description: "建立與管理校務行程，四種身分皆可檢視；其他模組可經接口掛勾行程。";
    readonly scope: "assignable";
    readonly status: "built";
    readonly href: "/admin/calendar";
    readonly children: readonly [];
}, {
    readonly value: "activity";
    readonly label: "稽核紀錄";
    readonly category: "系統與紀錄";
    readonly description: "檢視管理端操作的稽核紀錄（API 已上線，查詢頁面建置中）。";
    readonly scope: "assignable";
    readonly status: "apiOnly";
    readonly href: "";
    readonly children: readonly [];
}, {
    readonly value: "modules";
    readonly label: "功能模組管理";
    readonly category: "系統與紀錄";
    readonly description: "管理各功能模組的總開關，以及對四種身分的啟用狀態。";
    readonly scope: "superOnly";
    readonly status: "built";
    readonly href: "/admin/modules";
    readonly children: readonly [];
}, {
    readonly value: "themeMarket";
    readonly label: "主題市集";
    readonly category: "系統與紀錄";
    readonly description: "瀏覽與安裝外部主題市集的 CSS 主題，安裝前自動驗證 checksum、版本與下載來源。";
    readonly scope: "superOnly";
    readonly status: "built";
    readonly href: "/admin/theme-market";
    readonly children: readonly [];
}, {
    readonly value: "stats";
    readonly label: "統計儀表板";
    readonly category: "系統與紀錄";
    readonly description: "檢視 App Hosting（Cloud Run／Cloud Build）與 Firestore 的用量，對照免費額度與近期趨勢。";
    readonly scope: "superOnly";
    readonly status: "built";
    readonly href: "/admin/stats";
    readonly children: readonly [];
}, {
    readonly value: "recreation";
    readonly label: "休閒歡樂誠";
    readonly category: "系統與紀錄";
    readonly description: "課餘休閒小遊戲；四種身分功能首頁左上角城堡圖示與入口卡進入。";
    readonly scope: "core";
    readonly status: "built";
    readonly href: "/recreation";
    readonly children: readonly [];
}, {
    readonly value: "examRegistration";
    readonly label: "升學考試與模擬考校內報名";
    readonly category: "校務資料";
    readonly description: "校內升學考試與模擬考的報名、名單與造冊工具。\n\n【學生端】\n• 開放期間勾選選考科目，可修改、取消；截止後唯讀，可下載 PDF 留存。\n• 支援必／選報與不報名原因、繳費身分與費用試算、考試地點選擇、應考服務填寫與自行封存。\n• 場次依報名起訖自動顯示未開放／開放／已截止，未開放前不可送出。\n\n【教職員】\n• 兼導師可唯讀檢視本班各場次的班級完成狀態與報名名單。\n\n【管理端】\n• 建立場次與科目、指定年級班級、設定考試日期（可多日）與報名起訖、必／選報與費用。\n• 名單統計、班級區間匯出（全部／完成／未完成）、官方報名資料檔（學測、分科測驗、英聽、術科與通用格式）。\n• 可同步系統公告與行事曆；依權限解除封存、刪除登錄、硬刪除場次（連動名單）。\n\n【家長端】\n• 家長可唯讀查看名冊綁定子女的報名資料。";
    readonly scope: "assignable";
    readonly status: "built";
    readonly href: "/admin/exam-registration";
    readonly children: readonly [];
}, {
    readonly value: "identityTaxInquiry";
    readonly label: "註冊身分與財稅查調";
    readonly category: "校務資料";
    readonly description: "每學期註冊身分確認與必要時的財稅查調作業。\n\n【學生端】\n• 於學校開放期間確認本學期註冊身分別（一般生、原住民、低收入戶、中低收入戶、身心障礙等）。\n• 需要財稅查調時，依對象填寫父、母、本人或監護人的身分證字號，不收集查調對象姓名。\n• 每次送出確認均須重新同意個人資料授權；可先存草稿（不需同意），截止前可修改，截止後唯讀。\n\n【教職員】\n• 兼導師查看本班註冊身分確認進度與名冊。\n• 具財稅查調權限者可更新查調狀態（待查調／已查調／免查調）與備註。\n\n【管理端】\n• 設定學期開放起訖、身分別選項、需查調身分別、是否必填父母身分證字號與實施說明。\n• 查看全校確認進度與統計，匯出查調名冊（含父母、本人與監護人身分證字號）。\n\n【家長端】\n• 家長可唯讀查看子女本學期的註冊身分確認結果（身分證字號遮蔽顯示）。";
    readonly scope: "assignable";
    readonly status: "built";
    readonly href: "/admin/identity-tax-inquiry";
    readonly children: readonly [];
}, {
    readonly value: "selfDirectedLearning";
    readonly label: "自主學習計畫";
    readonly category: "校務資料";
    readonly description: "自主學習計畫的申請、審核與進度紀錄。";
    readonly scope: "assignable";
    readonly status: "built";
    readonly href: "/admin/self-directed-learning";
    readonly children: readonly [];
}];
/** 模組代碼的聯合型別（＝`users.ts` 的 `AdminModule`） */
export type ModuleValue = (typeof MODULES)[number]["value"];
/** 某一分類下的模組（分類頁分區塊用） */
export declare function modulesInCategory(category: ModuleCategory): readonly ModuleMeta[];
/** 依代碼查模組中繼資料（未知代碼回 undefined） */
export declare function moduleMeta(value: string): ModuleMeta | undefined;
