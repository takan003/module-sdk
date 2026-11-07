export declare const GENERATED_MODULES: readonly [{
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
/** 產生列的代碼清單（註冊表過濾／比對用；空陣列時為空清單） */
export declare const GENERATED_MODULE_VALUES: readonly string[];
/** 由產生列派生的權限單位代碼聯合型別（無產生列時為 never） */
export type GeneratedModuleValue = "examRegistration" | "identityTaxInquiry" | "selfDirectedLearning";
