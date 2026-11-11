export declare const GENERATED_FEATURE_MODULES: readonly [{
    readonly value: "examRegistration";
    readonly label: "升學考試與模擬考校內報名";
    readonly marketName: "升學考試與模擬考校內報名";
    readonly kind: "optional";
    readonly status: "live";
    readonly description: "校內升學考試與模擬考的報名、名單與造冊工具。\n\n【學生端】\n• 開放期間勾選選考科目，可修改、取消；截止後唯讀，可下載 PDF 留存。\n• 支援必／選報與不報名原因、繳費身分與費用試算、考試地點選擇、應考服務填寫與自行封存。\n• 場次依報名起訖自動顯示未開放／開放／已截止，未開放前不可送出。\n\n【教職員】\n• 兼導師可唯讀檢視本班各場次的班級完成狀態與報名名單。\n\n【管理端】\n• 建立場次與科目、指定年級班級、設定考試日期（可多日）與報名起訖、必／選報與費用。\n• 名單統計、班級區間匯出（全部／完成／未完成）、官方報名資料檔（學測、分科測驗、英聽、術科與通用格式）。\n• 可同步系統公告與行事曆；依權限解除封存、刪除登錄、硬刪除場次（連動名單）。\n\n【家長端】\n• 家長可唯讀查看名冊綁定子女的報名資料。";
    readonly href: "/admin/exam-registration";
    readonly author: {
        readonly author: "張家誠";
        readonly authorUrl: "https://github.com/takan003";
        readonly version: "0.1.58";
        readonly releasedAt: "2026-11-11";
    };
    readonly provides: {
        readonly student: true;
        readonly parent: true;
        readonly staff: true;
        readonly admin: true;
    };
    readonly defaultRoleEnabled: {
        readonly parent: false;
    };
    readonly managerPermissions: [{
        readonly value: "viewRoster";
        readonly label: "查看場次與名冊";
    }, {
        readonly value: "configure";
        readonly label: "建立／編輯／刪除場次";
    }, {
        readonly value: "approve";
        readonly label: "審核報名（解除封存／刪除登錄）";
    }, {
        readonly value: "export";
        readonly label: "匯出名單";
    }];
    readonly roleHrefs: {
        readonly student: "/student/exam-registration";
        readonly parent: "/parent/exam-registration";
        readonly staff: "/staff/exam-registration";
        readonly admin: "/admin/exam-registration";
    };
    readonly changelog: [{
        readonly version: "0.1.58";
        readonly releasedAt: "2026-11-11";
        readonly notes: ["module.json 新增選填 marketName（市集卡片名稱可與功能入口 label 分開）；目前與 label 相同，市集顯示不變。"];
    }, {
        readonly version: "0.1.57";
        readonly releasedAt: "2026-11-10";
        readonly notes: ["匯出 CSV 時對 =、+、-、@ 開頭的儲存格加單引號，避免 Excel／Sheets 公式注入。"];
    }, {
        readonly version: "0.1.56";
        readonly releasedAt: "2026-11-09";
        readonly notes: ["資料存取改用主程式 scopedDb；名冊核心集合改為唯讀，並補上 rosterStudents 宣告。", "既有 API、資料結構與使用者操作不變。"];
    }, {
        readonly version: "0.1.55";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["模組介紹改為分類條列（學生端、教職員、管理端、家長端）並精簡文字，市集卡片一眼可讀完整功能範圍", "市集更新說明改為條列呈現，與自主學習計畫模組一致"];
    }, {
        readonly version: "0.1.54";
        readonly releasedAt: "2026-10-22";
        readonly notes: ["官方報名資料檔新增「忽略身分證」勾選：勾選後缺證號的學生不再阻止匯出，其列排在試算表最上方，其餘按報名序號由小到大排序；未勾選維持原阻止行為並列出班級與姓名。"];
    }, {
        readonly version: "0.1.53";
        readonly releasedAt: "2026-10-21";
        readonly notes: ["版面寬度改比照功能首頁：三身分頁所有一級區塊與「管理功能」面板統一使用主程式的 content-width（80vw、min-width 286px），與功能首頁同一把尺規。", "內嵌的場次管理／名單頁在面板內改為填滿容器（新增 fill prop）；/admin 獨立使用時維持原本的 max-w-4xl 標準不變。"];
    }, {
        readonly version: "0.1.52";
        readonly releasedAt: "2026-10-21";
        readonly notes: ["版面寬度統一（一頁一骨架）：三身分頁（學生／家長／教職員）所有一級區塊——標題、分隔線、按鈕列、基本功能、頁尾——統一為 max-w-4xl，與「管理功能」面板同寬，左右邊界與分隔線完全對齊，收合／展合不再跳版。", "段落級文字（管理功能說明）內層限縮 max-w-2xl 控制行長；場次卡、名冊表格等結構化內容維持原生排版，於4xl下只是欄距放大。"];
    }, {
        readonly version: "0.1.51";
        readonly releasedAt: "2026-10-21";
        readonly notes: ["教職員頁版面：標題與「返回功能首頁」按鈕間距拉開（mb-6），標題下顯示「兼導師班級：班級代碼」；後端失敗時也回傳 classCode，班級名稱仍可顯示。", "沒有場次、沒有適用所屬班級或後端暫時取不到資料時，一律顯示「目前沒有適用的考試場次」，不再出現「請洽系統管理員」等洽辦提醒；非兼導師仍維持不顯示該區。"];
    }, {
        readonly version: "0.1.50";
        readonly releasedAt: "2026-10-21";
        readonly notes: ["身分功能頁的管理面板改名為「管理功能」並改為收合／展開（details/summary＋DisclosureArrow，預設收合；帶 ?eventId= 進名單視圖時自動展開），說明文字改為「下方為此身分的基本功能。」。", "三身分頁（學生／家長／教職員）的排列調整：管理功能置於上方，該身分的基本功能移到其下方。"];
    }, {
        readonly version: "0.1.49";
        readonly releasedAt: "2026-10-21";
        readonly notes: ["教職員頁對非兼導師（無班級代碼）不再顯示「目前無法載入班級報名資料」提醒：此區不適用時直接不顯示（403 靜默處理），被指派管理者只看到下方的管理面板；其他載入失敗（如 500）仍會顯示錯誤訊息。"];
    }, {
        readonly version: "0.1.48";
        readonly releasedAt: "2026-10-21";
        readonly notes: ["被指派的管理者改在自己的身分功能頁（學生／家長／教職員）直接使用被授權的管理功能：新增管理面板（components/manager-panel.tsx），依 session.delegatedModules 渲染、未被指派者不顯示——預設內嵌場次列表與建立／編輯／刪除（configure），帶 ?eventId= 時改顯示名單／審核／匯出（viewRoster／approve／export），不必再前往 /admin。", "管理頁「查看名單」與名單頁「返回場次清單」連結改為可參數化（rosterHrefBase／listHref，預設 /admin 路徑），/admin 使用行為不變。"];
    }, {
        readonly version: "0.1.47";
        readonly releasedAt: "2026-10-20";
        readonly notes: ["配合主程式「不同身分管理政策」（需主程式 0.558+）：宣告 managerPermissions 子權限（查看場次與名冊／建立編輯刪除場次／審核報名／匯出名單），管理員 API 改以 requireModulePermission 逐動作守門——管理員恆全權；教職員／家長／學生由管理員於功能模組管理頁按學期指派，僅能執行被勾選的子權限。", "管理端頁面依 session 權限上下文隱藏無權限操作（建立／編輯／刪除／解除封存／匯出）。"];
    }, {
        readonly version: "0.1.46";
        readonly releasedAt: "2026-10-20";
        readonly notes: ["快取壽命改讀主程式系統設定（settings.cacheTtlSeconds，省錢專區，30–300 秒）：學生可見場次與管理端名單／應對象快取不再寫死 30 秒，由超級管理員統一調整。需主程式 0.551+（提供 getCacheTtlSeconds）。"];
    }, {
        readonly version: "0.1.45";
        readonly releasedAt: "2026-10-20";
        readonly notes: ["管理端省流根治：場次對象僅指定年級（無班級清單）時，名冊改以 grade in [...] 下推查詢——回傳筆數≈該年級人數而非全校（例：全校 922 人的高三場次從 922 讀降至 311 讀）。", "應對象學生抽出共用 30 秒快取（tabs／統計面板／xlsx 匯出同享）：同一場次短時間內各端點只讀一次 Firestore，不再各自全量重讀。", "xlsx 匯出 all/pending 從整期全校名冊改走應對象快取（同享年級/班級下推）。", "module.json 宣告 rosterStudents 複合索引（academicYear+semester+grade／classCode）——安裝後於主程式 firestore.indexes.json 建立對應索引。"];
    }, {
        readonly version: "0.1.44";
        readonly releasedAt: "2026-10-19";
        readonly notes: ["學生頁「必須報名」提示移除 var(--warning) 的 fallback 色值——遵守主程式 §3.5 CSS 主題套用契約條文 4（宿主保證 token 必有值，fallback 會掩蓋缺漏）。"];
    }, {
        readonly version: "0.1.43";
        readonly releasedAt: "2026-10-19";
        readonly notes: ["廢止科目名額上限（capacity）機制：移除學生端 n/m 與額滿鎖定、移除送出時額滿拒絕（409）、移除管理表單名額欄位與驗證；舊資料的 capacity 欄位一律忽略。", "同步移除 0.1.42 的 examEventCounters 計數器——人數聚合隨名額機制一併廢除，學生端不再有任何各科人數讀取。"];
    }, {
        readonly version: "0.1.42";
        readonly releasedAt: "2026-10-19";
        readonly notes: ["大幅省流：新增 examEventCounters 場次人數計數器，學生端 n/m 改讀計數器（每場次 1 點查），額滿檢查與人數統計不再全量掃描場次登錄——讀取量與報名人數無關。", "學生寫入（登錄／取消／封存）只清模組內快取、不再 bump 全站 cacheEpoch——報名高峰 30 秒快取不再被打爆；管理端名單／統計跨實例延遲上限 30 秒，匯出仍即時。", "家長端綁定子女改以學號＋學期下推查詢（1 筆、約 1 讀），取代整期全校名冊全量讀取。"];
    }, {
        readonly version: "0.1.41";
        readonly releasedAt: "2026-10-19";
        readonly notes: ["學生頁頂部增設「下載報名表說明」警告區（分點式），提示手機下載與封存提醒兩項修正。"];
    }, {
        readonly version: "0.1.40";
        readonly releasedAt: "2026-10-19";
        readonly notes: ["說明區改為分點式排版並精簡文字。"];
    }, {
        readonly version: "0.1.39";
        readonly releasedAt: "2026-10-19";
        readonly notes: ["修正手機版「下載為PDF」得到空白檔案：列印版面改以 afterprint 事件卸載（＋2 分鐘兜底），手機、電腦皆可正常下載。", "封存提醒僅在開放學生自行封存且未封存時出現；承辦關閉自行封存時直接下載，不再跳出多餘提示。"];
    }, {
        readonly version: "0.1.38";
        readonly releasedAt: "2026-10-18";
        readonly notes: ["修正場次清單「統計」按鈕載入失敗：延遲載入改為班級分頁後，統計面板改以 ?eventId=&stats=1 取回完整名單與統計。"];
    }, {
        readonly version: "0.1.37";
        readonly releasedAt: "2026-10-18";
        readonly notes: ["管理名單依報名方式提供：自由報名只列出完成報名者（未完成／不報名不顯示）；必須報名整班全部列出（含未完成／不報名，供對帳催辦）。"];
    }, {
        readonly version: "0.1.36";
        readonly releasedAt: "2026-10-18";
        readonly notes: ["名單頁嚴格省流：單班名冊只下推讀取該班名冊條目與登錄（classCode／studentClass 過濾），不再全量載入全校名冊後於記憶體過濾；班級分頁統計亦以場次對象班級下推讀取。"];
    }, {
        readonly version: "0.1.35";
        readonly releasedAt: "2026-10-18";
        readonly notes: ["排序控制列移到搜尋列下一行，且改為清單顯示後（省流閘門解除）才出現。"];
    }, {
        readonly version: "0.1.34";
        readonly releasedAt: "2026-10-18";
        readonly notes: ["場次清單支援排序：可選場次／考試日期／報名日期，預設由舊到新，點擊切換新到舊（反覆切換）。"];
    }, {
        readonly version: "0.1.33";
        readonly releasedAt: "2026-10-17";
        readonly notes: ["宣告家長入口功能預設關閉（defaultRoleEnabled.parent=false，需主程式 0.522+）。"];
    }, {
        readonly version: "0.1.32";
        readonly releasedAt: "2026-10-17";
        readonly notes: ["補上 firestoreIndexes 宣告（空陣列＝目前查詢皆不需複合索引）。"];
    }, {
        readonly version: "0.1.31";
        readonly releasedAt: "2026-10-17";
        readonly notes: ["補齊模組揭露資訊：授權（MIT）、原始碼位址、作者連結、關鍵字與改版記錄。"];
    }, {
        readonly version: "0.1.30";
        readonly releasedAt: "2026-10-17";
        readonly notes: ["未對應專屬官方格式的場次改以通用預設欄位匯出（科目名稱各一欄，值為 1/0 或進階選項代碼），不再誤用學測格式。"];
    }, {
        readonly version: "0.1.29";
        readonly releasedAt: "2026-10-17";
        readonly notes: ["新增分科測驗官方報名資料檔格式（12 欄：報名序號、身分證、考試地區、物理、化學、數學甲、生物、歷史、地理、數學乙、公民、特殊應考需求）。"];
    }, {
        readonly version: "0.1.28";
        readonly releasedAt: "2026-10-17";
        readonly notes: ["考區清單代碼與名稱改為可直接編輯。"];
    }, {
        readonly version: "0.1.27";
        readonly releasedAt: "2026-10-17";
        readonly notes: ["Enter 跳入費用欄位時自動全選數值，覆寫預設 0 更快速。"];
    }, {
        readonly version: "0.1.26";
        readonly releasedAt: "2026-10-17";
        readonly notes: ["選考科目 Enter 輔助：科目名稱→一般生→中低收入戶→新增空白科目並聚焦，跳過進階選項，不再誤觸送出表單。"];
    }, {
        readonly version: "0.1.25";
        readonly releasedAt: "2026-10-16";
        readonly notes: ["新增家長唯讀查看名冊綁定子女的報名資料。", "大學術科考試音樂／美術／體育組三場次報名合併為單一 17 欄官方檔。", "新增高中英語聽力測驗第一、二次考試官方檔格式（4 欄）。"];
    }];
}, {
    readonly value: "identityTaxInquiry";
    readonly label: "註冊身分與財稅查調";
    readonly marketName: "註冊身分與財稅查調";
    readonly kind: "optional";
    readonly status: "live";
    readonly description: "每學期註冊身分確認與必要時的財稅查調作業。\n\n【學生端】\n• 於學校開放期間確認本學期註冊身分別（一般生、原住民、低收入戶、中低收入戶、身心障礙等）。\n• 需要財稅查調時，依對象填寫父、母、本人或監護人的身分證字號，不收集查調對象姓名。\n• 每次送出確認均須重新同意個人資料授權；可先存草稿（不需同意），截止前可修改，截止後唯讀。\n\n【教職員】\n• 兼導師查看本班註冊身分確認進度與名冊。\n• 具財稅查調權限者可更新查調狀態（待查調／已查調／免查調）與備註。\n\n【管理端】\n• 設定學期開放起訖、身分別選項、需查調身分別、是否必填父母身分證字號與實施說明。\n• 查看全校確認進度與統計，匯出查調名冊（含父母、本人與監護人身分證字號）。\n\n【家長端】\n• 家長可唯讀查看子女本學期的註冊身分確認結果（身分證字號遮蔽顯示）。";
    readonly href: "/admin/identity-tax-inquiry";
    readonly author: {
        readonly author: "takan003";
        readonly authorUrl: "https://github.com/takan003";
        readonly version: "0.1.33";
        readonly releasedAt: "2026-11-11";
    };
    readonly provides: {
        readonly student: true;
        readonly parent: true;
        readonly staff: true;
        readonly admin: true;
    };
    readonly managerPermissions: [{
        readonly value: "configure";
        readonly label: "管理規則（開放期間、身分別選項、查調條件、實施說明）";
    }, {
        readonly value: "viewRecords";
        readonly label: "查看註冊身分確認名冊";
    }, {
        readonly value: "taxInquiry";
        readonly label: "財稅查調作業（更新查調狀態與備註）";
    }, {
        readonly value: "export";
        readonly label: "匯出查調名冊（含父母身分證字號）";
    }];
    readonly roleHrefs: {
        readonly student: "/student/identity-tax-inquiry";
        readonly parent: "/parent/identity-tax-inquiry";
        readonly staff: "/staff/identity-tax-inquiry";
        readonly admin: "/admin/identity-tax-inquiry";
    };
    readonly changelog: [{
        readonly version: "0.1.33";
        readonly releasedAt: "2026-11-11";
        readonly notes: ["module.json 新增選填 marketName（市集卡片名稱可與功能入口 label 分開）；目前與 label 相同，市集顯示不變。"];
    }, {
        readonly version: "0.1.32";
        readonly releasedAt: "2026-11-09";
        readonly notes: ["資料存取改用主程式 scopedDb；名冊核心集合維持唯讀。", "既有 API、資料結構與使用者操作不變。"];
    }, {
        readonly version: "0.1.31";
        readonly releasedAt: "2026-11-02";
        readonly notes: ["財稅查調不再收集對象姓名，家長檢視及 CSV 同步調整，保留學生名冊姓名。", "每次送出確認均須重新同意個人資料授權，記錄版本與同意時間；草稿不需同意。", "修正實施說明編輯器提示語：聚焦即隱藏，避免中文組字時重疊；空白失焦後恢復，提示文字不攔截點擊。"];
    }, {
        readonly version: "0.1.30";
        readonly releasedAt: "2026-11-02";
        readonly notes: ["財稅查調不再收集對象姓名；驗證、家長檢視與 CSV 同步僅使用證號，保留學生名冊姓名。", "每次送出確認均須重新閱讀並勾選個人資料授權，後端檢查告知版本並記錄同意時間；草稿不需同意。", "新增授權、查調證號、舊資料相容與 CSV 回歸測試，補充授權範本依據及學校上線前確認事項。"];
    }, {
        readonly version: "0.1.29";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["移除文字欄位與標題重複的 placeholder；身分證字號欄改顯示範例「例：A123456789」。"];
    }, {
        readonly version: "0.1.28";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["手機版身分別欄位調整：文字欄位改為整列顯示且輸入框至少 10rem，下拉選單至少 6rem，避免身分證字號被壓縮。"];
    }, {
        readonly version: "0.1.27";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["查調對象用語調整：「父母（法定代理人）雙方」、「監護人（法定代理人無法行使親權）」，CSV 同步。"];
    }, {
        readonly version: "0.1.26";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["查調對象新增「監護人（法定代理人無法行使）」：填監護人姓名與身分證字號；名冊、CSV、家長端與教職員端同步支援。"];
    }, {
        readonly version: "0.1.25";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["查調對象「父或母一方」涵蓋亡故情形：文字改為「父或母一方（離異或亡故）」，驗證與提示同步調整。"];
    }, {
        readonly version: "0.1.24";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["學生端進階選項只顯示項目名稱，不再顯示項目代碼（代碼仍保留於管理端設定與資料中）。"];
    }, {
        readonly version: "0.1.23";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["學生端：勾選需查調的身分別時才顯示「財稅查調資料」區塊；標記文字改為「（需查調財稅資料）」。"];
    }, {
        readonly version: "0.1.22";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["學生端身分別改為原則上一行顯示（標籤與進階選項同列，必要時自動換行），並移除「與同組擇一」提示。"];
    }, {
        readonly version: "0.1.21";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["進階選項的選項清單改為逐列「項目代碼＋項目名稱」單行輸入，可新增／刪除選項；舊資料自動轉換（代碼空白、名稱為原值）。"];
    }, {
        readonly version: "0.1.20";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["身分別卡片的表單元件加大：互斥群組、金額、項目說明與進階選項輸入框改為 px-3 py-2 text-sm。"];
    }, {
        readonly version: "0.1.19";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["身分別欄位重新排列：第1行開放勾選（危險色）與互斥群組、第2行優待性質與金額、第3行項目說明；「優待方式」更名為「優待性質」。"];
    }, {
        readonly version: "0.1.18";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["每個身分別新增優待設定：優待方式（減免／補助二擇一）、金額（正整數）、項目說明（單行）。"];
    }, {
        readonly version: "0.1.17";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["統一四處標題為 36px 粗體：啟用本功能、確認開放時間、確認截止時間、實施說明。"];
    }, {
        readonly version: "0.1.16";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["標題尺寸調整：管理規則 46px；啟用本功能、實施說明、身分別選項、候選區統一 36px 粗體。"];
    }, {
        readonly version: "0.1.15";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["再放大三個標題：管理規則 36px、啟用本功能 26px、實施說明 26px，皆為粗體。"];
    }, {
        readonly version: "0.1.14";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["實施說明編輯器加大：預設高度 6rem→12rem、字級改為 text-base，仍可手動拖曳調整大小。"];
    }, {
        readonly version: "0.1.13";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["管理端標題字體放大 50% 並改為粗體（管理規則、確認進度、確認名冊、實施說明、身分別選項、候選區）。"];
    }, {
        readonly version: "0.1.12";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["實施說明移到身分別選項卡片之上（仍在卡片之外），方便先設定說明再編輯選項。"];
    }, {
        readonly version: "0.1.11";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["實施說明改用模組內建的所見即所得編輯器（不依賴主程式元件），可正常上架與掛載。"];
    }, {
        readonly version: "0.1.10";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["身分別卡片前方加上順位編號；實施說明改為所見即所得編輯器，學生／教職員／家長端以富文本呈現。"];
    }, {
        readonly version: "0.1.9";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["管理端將「身分別選項」包成獨立卡片，讓實施說明明顯位於該卡片之外。"];
    }, {
        readonly version: "0.1.8";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["管理端新增「候選區」：取消「開放勾選」的身分別會集中到下方儲存設定之後，可重新勾選回到主清單。"];
    }, {
        readonly version: "0.1.7";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["管理端儲存設定時，取消「開放勾選」的身分別會自動排到清單最後，其餘順序不變。"];
    }, {
        readonly version: "0.1.6";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["管理規則「啟用本功能」標題字體放大 50%（14px → 21px）。"];
    }, {
        readonly version: "0.1.5";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["管理規則卡片內新增上方「儲存設定」按鈕，長表單不必捲到最下方即可儲存。"];
    }, {
        readonly version: "0.1.4";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["管理端「管理規則」卡片改為可收合（預設收合），並固定為頁面第一張卡片；管理員與被指派的管理人員皆適用。"];
    }, {
        readonly version: "0.1.3";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["管理端進階選項的選項清單加上標籤與範例提示，避免與「實施說明」多行輸入框混淆。"];
    }, {
        readonly version: "0.1.2";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["管理端頁面內容改為 content-width（80vw），與其他模組頁面一致。"];
    }, {
        readonly version: "0.1.1";
        readonly releasedAt: "2026-10-30";
        readonly notes: ["身分別改為管理端可增刪改：名稱、顯示順序、開放勾選、互斥群組（低收入戶與中低收入戶同組，僅能擇一）。", "每個身分別可設定進階選項（下拉單選、勾選、文字，可設必填），例如障礙程度、住宿生、公費別與核准文號。", "財稅查調改為每個身分別各自設定；查調對象分父母雙方／離異一方／本人（已婚），並依對象驗證證號。"];
    }, {
        readonly version: "0.1.0";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["新模組：每學期註冊身分確認（原住民、低收入戶、中低收入戶、身心障礙等）與必要時的財稅查調", "學生可填寫父母姓名與身分證字號供查調；教職員可更新查調狀態，管理端可設定規則並匯出查調名冊", "四種身分（學生、教職員、家長、管理員）皆有功能入口"];
    }];
}, {
    readonly value: "selfDirectedLearning";
    readonly label: "自主學習計畫";
    readonly marketName: "自主學習計畫";
    readonly kind: "optional";
    readonly status: "live";
    readonly description: "自主學習計畫的申請、審核與進度紀錄。";
    readonly href: "/admin/self-directed-learning";
    readonly author: {
        readonly author: "takan003";
        readonly authorUrl: "https://github.com/takan003";
        readonly version: "0.0.150";
        readonly releasedAt: "2026-11-11";
    };
    readonly provides: {
        readonly student: true;
        readonly parent: true;
        readonly staff: true;
        readonly admin: true;
    };
    readonly managerPermissions: [{
        readonly value: "configure";
        readonly label: "管理規則（送審時間、週數、節次行程、場域、審核名單、說明）";
    }, {
        readonly value: "review";
        readonly label: "審核計畫（通過／退回）";
    }, {
        readonly value: "viewPlans";
        readonly label: "查看、管理計畫清單";
    }];
    readonly roleHrefs: {
        readonly student: "/student/self-directed-learning";
        readonly parent: "/parent/self-directed-learning";
        readonly staff: "/staff/self-directed-learning";
        readonly admin: "/admin/self-directed-learning";
    };
    readonly changelog: [{
        readonly version: "0.0.150";
        readonly releasedAt: "2026-11-11";
        readonly notes: ["module.json 新增選填 marketName（市集卡片名稱可與功能入口 label 分開）；目前與 label 相同，市集顯示不變。"];
    }, {
        readonly version: "0.0.149";
        readonly releasedAt: "2026-11-09";
        readonly notes: ["資料存取改用主程式 scopedDb；名冊核心集合改為唯讀，並補上 rosterStudents 宣告。", "既有 API、資料結構與使用者操作不變。"];
    }, {
        readonly version: "0.0.148";
        readonly releasedAt: "2026-11-06";
        readonly notes: ["學校設定改走主程式唯讀公開面（module-host-data／readSystemDoc），不再直接存取 settings 集合。", "文件匯出測試補上新的宿主公開面 mock。"];
    }, {
        readonly version: "0.0.147";
        readonly releasedAt: "2026-11-03";
        readonly notes: ["將學生端文件匯出確認視窗調整為 80vw，移除原本的寬度上限。"];
    }, {
        readonly version: "0.0.129";
        readonly releasedAt: "2026-11-02";
        readonly notes: ["移除管理規則頁的「上線驗收與資料注意事項」說明區塊，保留 Google Docs／Canva 設定說明、服務開關與學生端資料傳送同意流程。"];
    }, {
        readonly version: "0.0.128";
        readonly releasedAt: "2026-11-02";
        readonly notes: ["Google Docs 新增四種文件風格與簡短錯誤提示；完成 Word（.docx）下載，支援未儲存內容及兩種成果排版，下載請求統一驗證開關，連線失敗可手動重試。", "管理規則新增 Google Docs、Canva、Word 獨立開關，全部預設關閉，並提供平台啟用說明；新增 Canva OAuth／PKCE 與文件匯入流程，但實際授權仍待 Canva 無效 Client ID 問題排除。", "57 項合成回歸測試、Lint、型別檢查與模組掃描通過；Word 使用者端下載及 Canva 實際授權／匯入尚待驗收，建議維持關閉至學校完成測試。"];
    }, {
        readonly version: "0.0.127";
        readonly releasedAt: "2026-11-02";
        readonly notes: ["完成 Word（.docx）下載，沿用四種文件風格、成果分開式／融入式與未儲存內容快照；不需 Google／Canva 授權，不另存匯出資料。", "Word 下載受管理人員獨立開關、學生身分、模組開關、CSRF 與限流保護；伺服器即時產生原生 OOXML 文件並提供明確下載與失敗提示。"];
    }, {
        readonly version: "0.0.126";
        readonly releasedAt: "2026-11-02";
        readonly notes: ["管理規則新增 Google Docs、Canva、Word 獨立匯出開關，預設全部關閉；學生選單隱藏關閉服務，匯出前核對學校設定，Canva API 與回呼同步限制。Word 尚未完成，開關不會提前提供下載；列印功能不受影響。"];
    }, {
        readonly version: "0.0.125";
        readonly releasedAt: "2026-11-02";
        readonly notes: ["修正 Next.js 將 loopback 網址正規化為 localhost 時誤擋 Canva 匯出：以實際 Host／代理來源標頭核對設定，保留主機、連接埠與協定檢查；設定失敗不再持續顯示檢查中。"];
    }, {
        readonly version: "0.0.124";
        readonly releasedAt: "2026-11-02";
        readonly notes: ["管理規則頁新增 Google Docs／Canva 啟用設定說明，包含平台準備、權限、環境變數、本機與正式回呼、常見問題及個資驗收清單，預設收合供管理人員查閱。"];
    }, {
        readonly version: "0.0.123";
        readonly releasedAt: "2026-11-02";
        readonly notes: ["新增 Canva 官方 OAuth／PKCE 授權與文件匯入，學生同意後將目前計畫、未儲存成果與心得建立為可編輯設計，保留四種文件風格與原 Google Docs 功能。", "憑證僅於後端使用，授權資料存於短效加密 HttpOnly cookie，不持久化學生文件或 refresh token；提供匯入進度、取消授權與明確失敗提示。"];
    }, {
        readonly version: "0.0.122";
        readonly releasedAt: "2026-11-02";
        readonly notes: ["Google Docs 匯出依拒絕原因顯示簡短中文處理提示，區分 Drive API 未啟用、空間不足、權限、學校政策及配額問題，不顯示原始長訊息或錯誤代碼。", "Google Docs 匯出新增文件風格選單：基本款、清爽正式、黑白簡約、作品集，保留相同可編輯內容與成果分開式／融入式；基本款不加裝飾配色。"];
    }, {
        readonly version: "0.0.121";
        readonly releasedAt: "2026-11-02";
        readonly notes: ["新增匯出格式／平台下拉選單，第一階段提供 Google Docs；Canva 與 Word 顯示為後續階段，原列印功能保留。", "學生確認資料傳送並授權自己的 Google 帳號後，建立可編輯文件副本，包含計畫、逐週成果及心得與尚未儲存的內容；不公開分享、不回寫校內資料。", "採 drive.file 最小權限、token 僅供本次使用，提供取消授權、權限不足、網路及逾時的明確錯誤，附回歸測試與 Google Cloud 設定說明。"];
    }, {
        readonly version: "0.0.120";
        readonly releasedAt: "2026-10-31";
        readonly notes: ["學生「發想新計畫」改為自由發想：可安排 6–21 週、週次依序第 1～N 週，不綁學校行事曆、不檢核衝堂，也不再顯示日期與節次", "送出審核時才依現行學校規範自動補齊或調整週數（全學期形式補足學期總週數、彈性形式補足下限並以學期總週數為上限），再檢核每週學習安排與場地", "計畫詳情與列印預覽同步移除日期／節次欄位；管理端設定與成果紀錄開放時間維持不變"];
    }, {
        readonly version: "0.0.119";
        readonly releasedAt: "2026-10-31";
        readonly notes: ["家長端自主學習頁面改與學生端相同版型：加入系統名稱／學校／學期抬頭、頁首頁尾的返回功能首頁與登出按鈕、實施說明卡片、廣告與版權區", "計畫內容改用一致的卡片樣式，「查看計畫與撰寫成果」改為收合區並以週次／學習安排／場地表格呈現，審查意見與維護、未開放檢視等空狀態同步套用相同樣式"];
    }, {
        readonly version: "0.0.118";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["新增「家長檢視」開關：學生的每一份正式計畫（學校通過或自行提升）都可自行決定是否讓家長看到，學生端計畫卡片提供「隱藏家長檢視／開放家長檢視」按鈕，並在隱藏時顯示「家長不可見」標記", "家長端只會顯示學生開放的計畫；若子女有計畫但全部設為不開放，改為提示「子女目前未將自主學習計畫開放給家長檢視」", "計畫新增 `parentVisible` 欄位（預設 true，舊資料視為開放），並新增稽核動作 `self_directed_learning_plan_parent_visibility_changed`"];
    }, {
        readonly version: "0.0.117";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["學生端「我的計畫」改為一次只能展開一份計畫：開啟某份「查看計畫與撰寫成果」時，其他已展開的計畫會自動收合，避免同時出現兩份展開內容"];
    }, {
        readonly version: "0.0.116";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["修正主要行動按鈕顏色不明顯：`btn-primary`／`btn-danger` 誤與 `btn-theme` 併用，被後定義的 btn-theme 樣式覆蓋成灰底，已移除衝突類別，主色與危險色按鈕恢復正常", "「發想新計畫」按鈕改為主色實心、加上＋圖示與較大字距，於「我的計畫」標題列更醒目"];
    }, {
        readonly version: "0.0.115";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["開啟「撰寫計畫」表單（發想新計畫或編輯草稿）時，自動收合上方所有已展開區塊：自主學習實施說明、「查看計畫與撰寫成果」詳情與執行成果編輯區，並隱藏成果紀錄浮動按鈕，避免與表單搶版面", "「查看計畫與撰寫成果」改為受控展開狀態，表單開啟期間保持收合；關閉表單後可再自行展開"];
    }, {
        readonly version: "0.0.114";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["修正自行提升為正式的計畫仍同時顯示「草稿」與「正式（自行提升）」兩種標籤的問題：自行提升後不再顯示草稿／退回修改標籤，只保留「正式（自行提升）」；審核中的計畫仍保留「審核中」標籤"];
    }, {
        readonly version: "0.0.113";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["調整學生端分頁下方說明文字為「文件匣、草稿匣的可保存份數為 文件匣 N 份、草稿匣 N 份；垃圾桶最多保留 30 天，逾期自動刪除。」"];
    }, {
        readonly version: "0.0.112";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["學生端分頁下方新增說明：文件匣、草稿匣可保存份數上限由學校設定（顯示目前上限），垃圾桶最多保留 30 天後自動刪除；分頁也加上提示文字。"];
    }, {
        readonly version: "0.0.111";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["統一用語：學生端與家長端的「自主提升」一律改為「自行提升」，避免與「自主學習」混淆。"];
    }, {
        readonly version: "0.0.110";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["撰寫計畫表單新增「提升為正式」按鈕：先檢核目前填寫內容的必填欄位，通過後自動儲存並提升；有缺漏同樣以 modal 列出並阻止。"];
    }, {
        readonly version: "0.0.109";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["草稿提升為正式計畫前自動檢查必填欄位（主題、學群、學習目標、逐週學習內容與場地）；有缺漏時以 modal 列出並阻止提升。"];
    }, {
        readonly version: "0.0.108";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["學生端「送審說明」三點改為精簡白話版：草稿慢慢寫再轉正式計畫、正式計畫須該週結束後才寫執行紀錄、每學期僅送審 1 份。"];
    }, {
        readonly version: "0.0.107";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["開放撰寫改為送審期間：草稿與正式計畫在學期中可隨時建立、編輯，只有送出審核受送審期間限制", "文件匣（審核中＋已通過＋自主提升）與草稿匣容量改由學校設定（預設 20／20，無硬上限）；仍維持每學期送審 1 份、學校審核通過 1 份，自主提升可多份", "成果／反思截止時間只適用學校審核通過的計畫；學生進入頁面時自動永久刪除 30 天前垃圾桶計畫"];
    }, {
        readonly version: "0.0.106";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["嚴格落實「每學期只能送審 1 份」：第一次送出後，同一學期只能重送同一份計畫；退回或抽回後也不能改送其他計畫（新增 firstSubmittedAt 記錄第一次送審時間，不再清除）", "學生端送出按鈕與提示同步：本學期已送審過其他計畫時停用送出，並提示改為編輯原計畫"];
    }, {
        readonly version: "0.0.105";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["學生端「我的計畫」說明合併最後兩點為一點（每學期送審 1 份、最低份數、送審依學校公告的審核期間），共 3 點"];
    }, {
        readonly version: "0.0.104";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["學生端「我的計畫」說明再精簡為 4 點：草稿匣寫完提升為正式、時間過了寫成果與反思、每學期送審 1 份（含學校最低份數）、送審與審核期限"];
    }, {
        readonly version: "0.0.103";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["學生端「我的計畫」說明依實際流程重寫為 6 點條列：擬訂計畫放草稿匣、完成後提升為正式、正式後時間過了寫成果與反思、學校最低審查份數、送審與審核期限、每學期僅能送審 1 份（模組固定）"];
    }, {
        readonly version: "0.0.102";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["學生端「我的計畫」上方的說明改為條列，讓學生清楚知道：每學期僅能送審 1 份正式計畫、可自行提升為正式（個人可有多份）、就學期間至少需幾份經學校審查通過（依管理端設定）、開放期間外仍可存草稿"];
    }, {
        readonly version: "0.0.101";
        readonly releasedAt: "2026-10-29";
        readonly notes: ["管理規則的「高中三年最低自主學習時數」改為「就學期間，學校審查通過最低份數」（0–6 份，0＝不設定）", "說明改為兩點條列：總綱規定每人至少 18 小時自主學習；學校可要求最低審查通過份數，確保學生做完最低規範"];
    }, {
        readonly version: "0.0.100";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["README 補充維護與問題回報說明，版本標示同步更新（功能與程式未變動）"];
    }, {
        readonly version: "0.0.99";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["移除學生端與家長端的時數目標顯示，以及「顯示給學生／家長」兩個勾選；沒有實際檢核時不再顯示靜態目標，避免誤導", "保留管理端「高中三年最低自主學習時數」設定，作為未來政策與檢核機制的依據"];
    }, {
        readonly version: "0.0.98";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["審核人員的檢視頁只顯示送審中（submitted）的計畫；已通過、退回修改與草稿都不再顯示", "移除審核人員的「我的班級」切換；兼導師且非審核人員者仍可瀏覽全班計畫，伺服器同步擋下審核人員的全班清單請求"];
    }, {
        readonly version: "0.0.97";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["管理端的顯示對象改為兩個獨立勾選：顯示給學生、顯示給家長（預設皆關閉）", "家長端開啟後會顯示高中三年最低時數目標，並標示「僅供參考；實際完成時數由學校另行檢核」"];
    }, {
        readonly version: "0.0.96";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["新增「顯示給學生」勾選（預設關閉）：開啟後，學生端「我的計畫」會顯示高中三年最低自主學習時數目標", "學生端文案明確標示「僅供參考；實際完成時數由學校另行檢核」，不把目標當成已檢核時數"];
    }, {
        readonly version: "0.0.95";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["「高中三年最低審核份數」改為「高中三年最低自主學習時數」：可設定 0–99 小時（0＝不設定，預設 18 小時）", "依高級中等學校總綱規定，說明文字改為每位學生須完成至少 18 小時的自主學習", "目前僅保存時數設定；實際時數計算、佐證與檢核機制尚未實作"];
    }, {
        readonly version: "0.0.94";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["「高中三年最低審核份數」的說明改為：依高級中等學校總綱規定，每位學生須完成至少 18 小時的自主學習，建議設定至少審核 1 份"];
    }, {
        readonly version: "0.0.93";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["「高中三年最低審核份數」加上 CSS 主題危險色套色：danger 左側強調框、danger 標題與淡 danger 底色"];
    }, {
        readonly version: "0.0.92";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["管理規則的「高中三年最低審核份數」移到功能總開關正下方，並以 CSS 主題主色左框與 surface 底色呈現"];
    }, {
        readonly version: "0.0.91";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["管理規則新增「高中三年最低審核份數」：可設定 0–6 份（0＝不設定），作為後續三年累計送審進度與檢核的依據", "此版本先保存設定欄位與伺服器驗證；學生端進度顯示與未達門檻提示依先前共識暫不實作"];
    }, {
        readonly version: "0.0.90";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["新增「提升為正式」：草稿、審核中或退回修改的計畫，學生可自行提升為正式；提升後可依既有每週時間開始填寫執行成果，不必等待學校審核通過", "學校審核仍會保留；之後被退回不影響已提升的正式狀態與成果；同一學期可有多份自行提升的正式計畫，但送審仍限一份、學校審核通過的正式計畫仍以一份為原則", "學生端顯示「正式（自主提升）」標記，教職員審核頁標示「已由學生提升為正式」，列印頁尾區分自主提升與學校通過", "送審、提升與審核通過時的衝突檢核同步調整；審核中或學校已通過的計畫仍不可移至垃圾桶"];
    }, {
        readonly version: "0.0.89";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["垃圾桶新增「永久刪除」：可將垃圾桶中的草稿／退回修改計畫連同相關審查紀錄永久刪除，操作前顯示二次確認，刪除後無法復原；按鈕使用 CSS 主題危險色", "永久刪除僅限本人且已移至垃圾桶的計畫；伺服器同步檢核狀態與 deletedAt，並新增稽核動作 self_directed_learning_plan_purged"];
    }, {
        readonly version: "0.0.88";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["管理規則新增「草稿匣件數上限」：可設定每位學生最多保留的草稿件數（1–100 件，預設 20 件，含退回修改）", "達到上限後仍可編輯既有草稿，但學生端「發想新計畫」按鈕會停用並顯示提示；刪除不需要的草稿或由管理員調高上限後即可再新增", "伺服器同步檢核新增草稿與從垃圾桶還原草稿，避免繞過上限"];
    }, {
        readonly version: "0.0.87";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["新增「發想新計畫」：學生可隨時在草稿匣建立、編輯與儲存草稿，不受開放撰寫期間或本學期已有正式計畫限制", "送出審核仍須在開放撰寫期間內，且每學期僅能有一件正式計畫、同時僅能有一件審核中；已有正式計畫或審核中計畫時，仍可繼續發想草稿", "相關按鈕與提示文字改為「發想新計畫」，並說明草稿可自由發想、送出才受期限與件數限制"];
    }, {
        readonly version: "0.0.86";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["分開式的執行成果紀錄表：週次欄比照計畫表顯示時段、日期與節次，欄位標題同步改為「週次／日期／節次」，內容垂直置中"];
    }, {
        readonly version: "0.0.85";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["修正富文本編輯器：空內容按下項目符號／編號清單等結構功能後，提示語仍顯示並蓋住清單符號的問題；內容含清單、引用等結構時即隱藏提示語"];
    }, {
        readonly version: "0.0.84";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["列印預覽表頭底色反轉：一般表頭改為較深的淺灰，融入式的「執行成果紀錄」標題列改為較淺的淺灰"];
    }, {
        readonly version: "0.0.83";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["融入式的「執行成果紀錄」標題列改用表頭元素，字體粗細、字級與顏色和其他欄位標題一致；標題列底色改為較深的淺灰"];
    }, {
        readonly version: "0.0.82";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["列印預覽的週次欄內容改為垂直置中：週次、時段、日期與節次在該列中上下居中對齊"];
    }, {
        readonly version: "0.0.81";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["列印預覽的表頭改為水平、垂直皆置中：基本資料列標題（學生、班級、主題、學群、指導老師、學習目標）與週次表頭（週次／日期／節次、學習安排、場地）"];
    }, {
        readonly version: "0.0.80";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["列印預覽的表格欄位標題改為水平置中：週次／日期／節次、學習安排、場地，以及融入式的「執行成果紀錄」標題列與分開式的成果表頭"];
    }, {
        readonly version: "0.0.79";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["融入式的執行成果紀錄改為跨「學習安排／場地」兩欄的獨立列：標題列使用實線框線與底色，成果內容另列於下方"];
    }, {
        readonly version: "0.0.78";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["「預覽列印（計畫與成果）」按鈕旁新增列印方式選項：可勾選「分開式」（預設，執行成果紀錄另列於表格下方）或「融入式」（執行成果紀錄直接併入當週學習安排），按預覽列印時依選項輸出", "列印預覽的週次欄比照計畫表，補上時段短標籤（彈性學習／課餘），與日期、節次分行顯示"];
    }, {
        readonly version: "0.0.77";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["新增「預覽列印（計畫與成果）」：已通過的計畫可在「查看計畫與撰寫成果」上下的按鈕列開啟 A4 列印預覽，內容包含學習目標、逐週安排、逐週執行成果紀錄與學習反思心得", "列印預覽頁沿用原本的新分頁預覽（postMessage 傳資料），並依來源顯示不同頁尾：草稿（含未儲存變更）／已通過的計畫與成果"];
    }, {
        readonly version: "0.0.76";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["每週「執行成果紀錄」的標題列改為醒目的卡片式：白底圓角框、粗體標題，左側狀態 SVG（未開放＝時鐘、未填寫＝鉛筆、已填寫＝勾選圈、已截止＝驚嘆號），並加上「未填寫／已填寫」色框標籤與「點此填寫」提示，右側保留展開箭頭"];
    }, {
        readonly version: "0.0.75";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["左側浮動 SVG 按鈕改為只在展開「查看計畫與撰寫成果」時出現，避免平時占用版面", "展開計畫後，該區塊的上方與下方各加一組文字按鈕：儲存執行成果紀錄、展開／收合全部成果編輯區，長頁面不必回到頂端或找左側按鈕"];
    }, {
        readonly version: "0.0.74";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["左側浮動 SVG 按鈕改版：外框由 44px 縮小為 34px、圖示由 20px 放大為 22px，儲存鈕改用簡潔的勾選圈圖示；撰寫表單的浮動按鈕同步調整，兩組外觀一致"];
    }, {
        readonly version: "0.0.73";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["學生端「查看內容」更名為「查看計畫與撰寫成果」", "每一週的「執行成果紀錄」改為可單獨收合／展開（原生 details，預設收合），避免整頁都是編輯器、版面過長", "左側新增兩顆浮動 SVG 按鈕：儲存執行成果紀錄、一次展開／收合全部成果編輯區（表格下方的儲存按鈕移除）"];
    }, {
        readonly version: "0.0.72";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["執行成果紀錄的編輯區從表格第四欄移到「每一週列下方」整列寬度（與逐週審查意見同一種呈現方式），編輯空間更大、表格也回到週次／學習安排／場地三欄", "執行成果紀錄與學習反思心得改用完整所見即所得編輯器（字型、字級、顏色與底色、對齊、清單、縮排、引用等），不再使用精簡工具列", "撰寫截止時間顯示改為含年份（YYYY/MM/DD HH:mm），避免跨年時看不懂"];
    }, {
        readonly version: "0.0.71";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["學生端與家長端的審查意見標題改為「學校審查意見回饋」，不再顯示審查人員姓名"];
    }, {
        readonly version: "0.0.70";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["修正「未設定成果撰寫截止時間時完全無法填寫」：未設定＝不限制填寫期限（只要該週規劃時間過了即可填寫），管理端設定截止時間後才以截止時間為準；學生端提示文字同步調整"];
    }, {
        readonly version: "0.0.69";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["「計畫成果撰寫截止」改為可設定到時與分（日期＋時間輸入），不再只到日；學生端顯示的截止時間同步改為日期＋時間"];
    }, {
        readonly version: "0.0.68";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["新增「執行成果紀錄」：計畫通過審核後，學生可在「查看內容」逐週補寫成果；每一週需等該週規劃時間（最後一個節次結束）過了才開放，時間還沒到的週次顯示開放時間", "新增「學習反思心得」：最後一週時間過了之後開放填寫（例如 6 週的計畫在第 7 週開放）", "管理規則新增「計畫成果撰寫截止日」：執行成果紀錄與學習反思心得只開放到此日（含當日），未設定＝不開放；伺服器同步檢核（僅已通過、本學期、該週時間已到、未超過截止日）", "成果紀錄與反思以所見即所得富文本儲存（可見文字上限 2000 字），由「儲存執行成果紀錄」按鈕一次儲存；新增稽核動作 self_directed_learning_plan_records_saved"];
    }, {
        readonly version: "0.0.67";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["「學習目標」改為區塊標題：標題移到框線外（學生端查看內容、教職員審核頁一致），框內只放學習目標內容"];
    }, {
        readonly version: "0.0.66";
        readonly releasedAt: "2026-10-28";
        readonly notes: ["學生端「我的計畫 → 查看內容」改與教職員審核頁相同的表格呈現：表頭週次／學習安排／場地水平置中，週次欄垂直置中並列出週次、時段、日期、節次，逐週審查意見改為該週列下方的整列區塊", "學生端逐週日期／節次僅在本學期的計畫顯示（沿用目前學期的節次行程推算），舊學期計畫不顯示以免誤標日期"];
    }, {
        readonly version: "0.0.65";
        readonly releasedAt: "2026-10-27";
        readonly notes: ["送出審核一律歸為本學期的計畫：舊學期的草稿送出時寫入目前學期（此前會沿用草稿建立時的學期，導致教職員審核佇列看不到、學生卡在審核中）", "新增「學生＋學期」鎖定文件（selfDirectedLearningLocks，doc id＝`<學期>_<uid>`）：送出審核、抽回、通過／退回都在交易內讀寫同一份鎖定文件，杜絕兩分頁同時送審、兩位審核者同時通過的競態", "「僅一件審核中」「僅一件通過」改以目前學期檢核，並保留既有計畫掃描以相容沒有鎖定文件的舊資料"];
    }, {
        readonly version: "0.0.64";
        readonly releasedAt: "2026-10-27";
        readonly notes: ["補強「同一學期僅能送審一件」規則：先前只檢查正式計畫（每學期一份），未擋下同時有兩件審核中；現在送出審核時會檢查同學期是否已有另一件審核中的計畫，有則回 409「本學期已有計畫在審核中，請等待審查結果或先抽回該計畫後再送出」", "學生端「送出審核」按鈕在有計畫審核中、或本學期已有通過的正式計畫時停用，並在表單上方以警示色說明原因；多筆草稿仍可自由新增與編輯"];
    }, {
        readonly version: "0.0.63";
        readonly releasedAt: "2026-10-27";
        readonly notes: ["修正逐週表格表頭置中無效：主程式 globals.css 的 th 規則未包 @layer，優先於 Tailwind 的 text-center 工具類，改用行內 text-align 讓「週次／學習安排／場地」確實水平置中"];
    }, {
        readonly version: "0.0.62";
        readonly releasedAt: "2026-10-27";
        readonly notes: ["水平置中只套用在表頭標題「週次／學習安排／場地」；逐週表格的週次欄維持垂直置中、水平仍靠左對齊"];
    }, {
        readonly version: "0.0.61";
        readonly releasedAt: "2026-10-27";
        readonly notes: ["教職員審核的逐週表格：表頭「週次／學習安排／場地」改為水平置中；週次欄改為上下垂直置中，並新增該週的日期與節次（各一行）", "週次欄的日期與節次由學期起訖、管理端勾選的節次行程與課表作息推算，與班級無關，整份清單共用一次計算（不增加資料庫讀取）"];
    }, {
        readonly version: "0.0.60";
        readonly releasedAt: "2026-10-27";
        readonly notes: ["教職員管理面板（被指派管理權限的教職員）不再顯示「管理員僅負責功能的規則設定，計畫審核、管理等請授權給指定的管理人員」提示；該提示僅對（超級）管理員顯示"];
    }, {
        readonly version: "0.0.59";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["修正送出審查時出現 `documentPath` 不是有效資源路徑的錯誤：主程式 Firestore 計讀／計寫 Proxy 會把無參數的 `.doc()` 轉成 `.doc(undefined)`，審核紀錄改以自行產生的文件 id，不再依賴自動 id", "審核請求的計畫識別新增 `/` 檢查；非法識別改回「缺少計畫識別」，避免底層 Firestore 錯誤訊息直接顯示在畫面"];
    }, {
        readonly version: "0.0.58";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["新增必填欄位「學習目標」：位於學生撰寫表單的主題／學群／指導老師之後，採所見即所得多行編輯器，說明文字為「簡單扼要描述，建議採用條列陳述」，可見文字上限 600 字", "送出審核時學習目標必填（伺服器檢核）；草稿可分次儲存、允許先留白", "學習目標以淨化後 HTML 儲存（learningGoals），學生「查看內容」、教職員審核卡片、家長檢視與 A4 列印預表頭都會顯示；舊計畫沒有此欄位時顯示「未填寫」"];
    }, {
        readonly version: "0.0.57";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["所有多行文字輸入框改為所見即所得編輯器：管理端「自主學習實施說明」「自主學習計畫撰寫說明」與教職員「審查意見」都支援字型、字級、粗斜體底線、顏色與底色、對齊、清單、縮排、引用與清除格式；內容一律先經白名單 HTML 淨化後儲存，舊版純文字自動保留換行", "教職員審核卡片標題改以「班號 姓名」顯示；每個計畫條目統一加上框線", "審核展開後的逐週安排改為表格（週次／學習安排／場地），每一週下方都有獨立的審查意見欄位，可針對單週填寫意見", "逐週意見與整體意見各提供 5 種常用罐頭語，選取後直接帶入（保留原有內容與格式）；退回時整體意見必填、逐週意見可留空", "學生端與家長端會顯示審核人員填寫的逐週意見；公告／行事曆同步時將富文本說明轉為純文字，避免顯示 HTML 標籤", "審查意見新增 weekNotes（逐週意見）欄位，仍相容沒有此欄位的舊資料"];
    }, {
        readonly version: "0.0.56";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["教職員審核佇列與全班清單改為收合式摘要卡片：預設只顯示學生／班級、主題／學群／指導老師、狀態、送出時間與已等待天數，展開後才顯示逐週安排與審查表單，避免多份計畫時頁面落落長", "清單加入純前端分頁（每頁 10／20／50／100 筆，預設 10 筆），翻頁不增加資料庫讀取", "配合主程式省流開關：啟用時審核頁先以 count 聚合取得待審件數，顯示「顯示審核列表」按鈕，按下後才載入計畫內容；審核期限提示卡與待審件數仍正常顯示", "待審件數以 Firestore count 聚合精準計算（全校／指定班級／指定個人各自下推；班級與個人同時指定時以既有清單計數去重）"];
    }, {
        readonly version: "0.0.55";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["學生可在開放撰寫期間內抽回審核中的計畫（警告色「抽回修改」按鈕＋確認視窗）：抽回後回到草稿匣、審核人員即看不到該計畫，可修改後重新送出；限本學期、限開放期間，伺服器與狀態一併檢核（transaction，避免與審核同時處理）", "管理端新增「審核期限」起訖設定：教職員審核頁顯示審核期限、待審件數、剩餘天數與逾期提醒，每筆待審計畫顯示已等待天數，以督促於期限內完成審核；期限僅供提示，逾期仍可審核，留空表示不設期限", "學生端顯示管理端設定的審核期間"];
    }, {
        readonly version: "0.0.54";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["列印輸出只保留紙張內容：列印時只顯示紙張（visibility 隔離），紙張以外的元素一律不輸出，包含瀏覽器擴充套件注入的浮動按鈕與其陰影（即使不是 button／SVG 也能隱藏）；另隱藏所有按鈕、SVG 圖示與 box-shadow"];
    }, {
        readonly version: "0.0.53";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["列印預覽移除紙張陰影：螢幕預覽與列印樣式都不再套用 box-shadow，PDF 不會再出現紙張邊緣的陰影"];
    }, {
        readonly version: "0.0.52";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["逐週表格第一欄底部新增向下箭頭（只有下面還有一週且兩週皆可撰寫時顯示）：點一下就把本週的學習安排與場地完整複製到下一週，自訂場地模式一併帶入，並以 Toast 提示"];
    }, {
        readonly version: "0.0.51";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["修正場地版面：自行輸入的文字框放在場地下拉選單的右側（同一列），空間不足時才自動換行；不是把整個場地控制項靠右"];
    }, {
        readonly version: "0.0.50";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["逐週表格第一欄縮窄：節次改為每節一行，欄位只保留週次、日期與節次", "合併「學習安排」與「場地」為同一欄；場地下拉選單（或自行輸入）放在學習安排輸入框上方，水平靠左對齊", "場地改為「學校開放場域下拉＋（開放時）其他自行填寫」：學校選項不再因學生輸入文字被 datalist 過濾而看不到；下拉與自訂輸入依文字內容自動寬度並維持響應式"];
    }, {
        readonly version: "0.0.49";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["文字顏色選色盤新增自訂顏色選擇器（native color picker），可搭配原有 preset 色塊使用", "新增文字底色（highlight）功能：工具列獨立按鈕與淺色調色盤、自訂顏色；白名單淨化允許安全的 background-color／bgcolor", "文字對齊改為靠左／置中／靠右三個 SVG 圖示，不再使用下拉選單"];
    }, {
        readonly version: "0.0.48";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["「我的計畫」的開放狀態改為醒目提示條：成功色淡底、狀態圓點、開放撰寫中字樣與完整開放期間，比原本的小膠囊更明顯；已截止時改用警示色"];
    }, {
        readonly version: "0.0.47";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["學生端「學群」改為教育部 18 學群下拉選單（資訊、工程、數理化、醫藥衛生、生命科學、生物資源、地球與環境、建築與設計、藝術、社會與心理、大眾傳播、外語、文史哲、教育、法政、管理、財經、遊憩與運動）", "學群選單保留「其他（自行填寫）」：主題跨域或沒有適合分類時，可自行輸入學群名稱或說明（上限 100 字）", "舊資料若學群不是 18 學群之一，編輯時會自動顯示為「其他」並帶出原文字，不會遺失"];
    }, {
        readonly version: "0.0.46";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["所見即所得編輯器的字級圖示改為小 T／大 T", "彈性週數形式改為選擇開始／結束週次：只列出可寫週次、即時計算可寫週數並擋下未達下限的區間（例如剩餘週次不足的地方不能當開始週次）", "起迄週次顛倒時跳出主題化確認視窗，確認後自動調換；調換後仍不足下限會明確提示", "管理端下限週數新增可寫週數檢核：以下限超過實際可寫週數時顯示警示並停用儲存，伺服器端同步拒絕，避免學生無處可寫"];
    }, {
        readonly version: "0.0.45";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["撰寫計畫表單頂部新增一組儲存草稿／送出審核按鈕，長表單不必捲到底才能儲存或送出", "儲存草稿與送出審核按鈕加大（py-3、text-base），取消按鈕也同步調整", "左側浮動圖示改為兩個 SVG：上方快速儲存草稿（軟碟片）、下方列印預覽（印表機），皆為 44px 觸控目標"];
    }, {
        readonly version: "0.0.44";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["學生端版面重新設計：自主學習實施說明改為預設展開的卡片（主色頂線、圖示與副標），我的計畫與撰寫計畫都是獨立卡片，加入明顯框線、主色頂線與區塊標題", "我的計畫改為文件匣（正式、審核中）、草稿匣（草稿、退回修改）、垃圾桶（假性刪除）三個分頁，附圖示與數量；草稿與退回修改可移至垃圾桶，垃圾桶可還原", "新增計畫 deletedAt 欄位與 trash／restore API：僅本人可操作，審核中與已通過的計畫不可移至垃圾桶；教職員與家長端會過濾垃圾桶計畫，並新增移至垃圾桶／還原的稽核動作", "撰寫計畫表單改為獨立卡片：區塊標題、撰寫說明 callout、表格外框與分區標題，讓長表單的界線更清楚"];
    }, {
        readonly version: "0.0.43";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["字型選單新增電腦常見的中英文字型：微軟正黑體、新細明體、標楷體、思源黑體、蘋方-繁、Arial、Times New Roman、Georgia、Courier New；字型名稱現在允許中文", "工具列的粗體、斜體、底線、刪除線與顏色按鈕改用行內樣式，確保斜體 I 與刪除線 S 在任何環境都正確顯示", "清除格式按鈕改用橡皮擦圖示", "學習安排編輯框恢復可上下左右拖曳調整大小"];
    }, {
        readonly version: "0.0.42";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["學生端「撰寫計畫」左側新增跟隨畫面的浮動列印預覽圖示（SVG），點擊後開新分頁以 A4 紙張樣式檢視目前編輯內容（含尚未儲存的變更）並可列印", "列印預覽以 postMessage 由撰寫頁傳遞草稿，不寫入資料庫；預覽頁使用白底黑字紙張樣式、重複表頭與避免列印分割週次列", "新增學生端頁面路由 /student/self-directed-learning/print；僅能由撰寫頁開啟取得內容，直接開啟時顯示提示"];
    }, {
        readonly version: "0.0.41";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["學習安排編輯器版面調整：字數統計移到編輯區上方、工具列移到編輯區下方，placeholder 固定在編輯區左上角", "編輯器、工具列、下拉選單與文字顏色選色盤改為直角，不再使用圓角"];
    }, {
        readonly version: "0.0.40";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["學生端「學習安排」升級為零依賴所見即所得編輯器：膠囊工具列提供復原／重做、字型、字級、粗斜體底線、文字顏色、對齊、編號與項目清單、縮排、引用、刪除線與清除格式，支援 placeholder、字數統計與停用狀態", "新增純 TypeScript 白名單 HTML 淨化：只允許安全標籤與屬性（含顏色、字級、對齊、縮排），移除 script／iframe／事件屬性／javascript: 與 url()；貼上內容同樣先淨化", "學習安排改存淨化後的 HTML（可見純文字上限 600 字、HTML 上限 6000 字元），舊版純文字資料仍可正常顯示與編輯", "學生端我的計畫、教職員端逐週檢視、家長端逐週安排改用共用富文本檢視元件，清單符號／編號、縮排與引用樣式在 Tailwind reset 下仍正確呈現"];
    }, {
        readonly version: "0.0.39";
        readonly releasedAt: "2026-10-26";
        readonly notes: ["學生端逐週表格的說明改為三點自動編號清單（日期推算、衝堂週次、課餘時間與場地），依說明文字格式規範簡化"];
    }, {
        readonly version: "0.0.38";
        readonly releasedAt: "2026-10-25";
        readonly notes: ["修正場地規則：管理端設定的「開放場域」是學生可選的固定清單；「開放學生自行輸入場地」只決定學生能否在清單之外自行輸入場地名稱", "關閉自行輸入時，學生端場地欄改為下拉選單（只能選學校開放的固定場域），送出審核時伺服器也會檢查場地是否在清單內", "關閉自行輸入但尚未設定任何開放場域時，管理端顯示警示，避免學生無法選擇場地"];
    }, {
        readonly version: "0.0.37";
        readonly releasedAt: "2026-10-25";
        readonly notes: ["修正學習安排文字框只能上下調整：改以行內樣式設定 resize，現在可上下左右拖曳調整大小", "表格最小寬度與學習安排／場地欄寬改以行內樣式設定，避免模組原始碼未被樣式掃描時失去響應式寬度"];
    }, {
        readonly version: "0.0.36";
        readonly releasedAt: "2026-10-25";
        readonly notes: ["管理規則新增「開放學生自行輸入場地」開關：關閉時學生端場地欄為唯讀並顯示「由學校安排」，送出審核不檢查場地（既有資料的場地值保留）", "學生端場地欄無論開放與否都使用同一個響應式輸入框（寬度隨欄位與畫面調整，不因唯讀而縮小）", "學習安排的多行文字框可上下左右拖曳調整大小"];
    }, {
        readonly version: "0.0.35";
        readonly releasedAt: "2026-10-25";
        readonly notes: ["逐週表格的「週次／日期／節次」合併為同一欄，減少橫向佔用、手機較好閱讀", "移除逐週表格的「時段」欄（學校彈性學習時間／課餘時間）；課餘時間的安排另行處理，既有資料的時段值保留不動"];
    }, {
        readonly version: "0.0.34";
        readonly releasedAt: "2026-10-25";
        readonly notes: ["學生端「撰寫計畫」的逐週課程安排改為表格：每一列自動推算該週彈性學習時間的日期與節次（依學期起訖與管理端勾選的節次行程），不再只靠學生自行判讀", "與行事曆的學校活動層級（全校／年級／班級）衝堂時，仍列出該週日期與節次，但顯示活動名稱、不提供撰寫，且送審時不列入必填", "課表作息文件尚未建立時改用主程式內建八節＋午休預設，節次衝堂比對與管理端節次格狀勾選不再空白"];
    }, {
        readonly version: "0.0.33";
        readonly releasedAt: "2026-10-25";
        readonly notes: ["管理規則的說明拆成兩類：「自主學習實施說明」給學生與家長的總說明；「自主學習計畫撰寫說明」給學生發起新計畫、編輯草稿時的撰寫說明", "學生端在「撰寫計畫」區塊顯示撰寫說明；家長端新增顯示實施說明", "舊版單一說明（instructions）相容對應為自主學習實施說明"];
    }, {
        readonly version: "0.0.32";
        readonly releasedAt: "2026-10-25";
        readonly notes: ["學生端改為「我的計畫」（上）與「撰寫計畫」（下，預設隱藏）兩個區塊；我的計畫分開列出正式計畫（已通過）與草稿計畫（未送審、審核中、退回修改），並可展開查看內容", "開放撰寫期間且本學期尚無正式計畫時可發起新計畫；點「發起新計畫」或草稿的「編輯」才展開撰寫表單", "同一學期可有多筆草稿，正式計畫僅一份：送審與審核通過時都會檢查；計畫 doc id 改為可容納多筆（舊資料仍相容）"];
    }, {
        readonly version: "0.0.31";
        readonly releasedAt: "2026-10-25";
        readonly notes: ["調整管理規則頁提示文字為：管理員僅負責功能的規則設定，計畫審核、管理等請授權給指定的管理人員"];
    }, {
        readonly version: "0.0.30";
        readonly releasedAt: "2026-10-24";
        readonly notes: ["管理權限「查看計畫清單」更名為「查看、管理計畫清單」"];
    }, {
        readonly version: "0.0.29";
        readonly releasedAt: "2026-10-24";
        readonly notes: ["調整管理規則頁提示文字為：管理員僅負責本頁的規則設定，請在下方「審核人員」指定教職員負責審查與管理"];
    }, {
        readonly version: "0.0.28";
        readonly releasedAt: "2026-10-24";
        readonly notes: ["管理規則頁新增警告色提示：管理員不負責審查與管理自主學習計畫，請於「審核人員」指定教職員負責"];
    }, {
        readonly version: "0.0.27";
        readonly releasedAt: "2026-10-24";
        readonly notes: ["移除審查人員改為先跳出一般等級的確認視窗（取消／確定移除），避免誤刪"];
    }, {
        readonly version: "0.0.26";
        readonly releasedAt: "2026-10-24";
        readonly notes: ["審核人員列表改為每位一行：只顯示姓名與三個圖示（對象名單／設定對象／移除），不再顯示 uid 與完整對象清單；對象名單改以彈出視窗依年級呈現，避免版面過長"];
    }, {
        readonly version: "0.0.25";
        readonly releasedAt: "2026-10-24";
        readonly notes: ["移除審核人員選擇班級與學生的數量上限（僅保留伺服器防濫用上限），不再以選擇數量當作省流手段", "省流聚焦候選名單載入：個人模式只在管理人員選擇班級時讀取該班學生（單班上限 60 筆），不會一次讀取全校名冊"];
    }, {
        readonly version: "0.0.24";
        readonly releasedAt: "2026-10-24";
        readonly notes: ["單一審核人員可指派的班級上限由 30 提高至 100（全校範圍建議使用預設「全校」，以單一查詢載入，較逐班查詢省流）"];
    }, {
        readonly version: "0.0.23";
        readonly releasedAt: "2026-10-24";
        readonly notes: ["審查對象的班級清單改依年級分組，每年級獨立區塊並提供「全選」；個人模式的班級下拉改用年級群組，避免年級名稱重複出現干擾閱讀"];
    }, {
        readonly version: "0.0.22";
        readonly releasedAt: "2026-10-24";
        readonly notes: ["審查對象改以班級指派為原則：勾選「指定審查班級」才展開班級清單；個別學生改為例外選項，需另勾選才顯示學生選擇，兩者可同時指定（聯集）"];
    }, {
        readonly version: "0.0.21";
        readonly releasedAt: "2026-10-24";
        readonly notes: ["儲存管理規則前檢查審查對象：選擇「指定班級／指定個人」但未勾選任何對象時阻擋儲存，避免空範圍被回退為全校"];
    }, {
        readonly version: "0.0.20";
        readonly releasedAt: "2026-10-24";
        readonly notes: ["審核人員卡片改為先搜尋再加入，加入後可設定審查對象：全校、指定班級（可多選）或指定個人（先選班級再勾選學生）", "省流機制：班級審查以各班的 period／status／classCode 等值查詢精準載入待審計畫；個人審查以計畫 doc id 精準讀取指定學生；管理端只在選擇班級時載入該班學生並在記憶體快取，不一次讀取全校名冊", "審核 API 於交易內比對審查範圍，範圍外的計畫無法以 planId 直接審核；舊資料未設定範圍者維持全校"];
    }, {
        readonly version: "0.0.19";
        readonly releasedAt: "2026-10-24";
        readonly notes: ["教職員端自主學習計畫頁版面比照「升學考試與模擬考校內報名」教職員頁：系統抬頭、功能標題與兼導師班級副標、上下操作按鈕、分隔線、管理功能面板位置、廣告與版權一致；內容顯示區維持原審核與檢視功能"];
    }, {
        readonly version: "0.0.18";
        readonly releasedAt: "2026-10-24";
        readonly notes: ["移除對主程式 school-periods／school-spaces 型別的 import，改由模組自行寬容讀取課表作息與樓層空間；module:check 靜態掃描通過，可上架市集"];
    }, {
        readonly version: "0.0.17";
        readonly releasedAt: "2026-10-24";
        readonly notes: ["系統公告與行事曆改為分開設定（兩個獨立開關），管理人員可分別決定是否同步發布", "公告與行事曆的發送對象皆包含教職員（學生、家長、教職員）；未勾選的項目完全不自動發送"];
    }, {
        readonly version: "0.0.16";
        readonly releasedAt: "2026-10-24";
        readonly notes: ["管理規則新增「公告與行事曆」區塊：由管理人員勾選儲存設定時是否同步發布（或更新）系統公告與行事曆行程；未勾選不再於背後自動發送，也不更動既有公告與行程"];
    }, {
        readonly version: "0.0.15";
        readonly releasedAt: "2026-10-24";
        readonly notes: ["學生端自主學習計畫頁版面比照「升學考試與模擬考校內報名」學生頁：系統抬頭、功能標題、上下操作按鈕、分隔線、廣告與版權位置一致；內容顯示區維持原本表單"];
    }, {
        readonly version: "0.0.14";
        readonly releasedAt: "2026-10-24";
        readonly notes: ["修正儲存設定時誤判為跨來源請求（assertSameOrigin 回傳值判斷反向）：同源請求可正常儲存，跨來源請求改由主程式 CSRF 檢查正確拒絕"];
    }, {
        readonly version: "0.0.13";
        readonly releasedAt: "2026-10-23";
        readonly notes: ["宣告 managerPermissions 子權限（管理規則 configure／審核 review／查看計畫 viewPlans），管理端 API 改以 requireModulePermission 守門；管理員恆全權", "教職員名單內審核資格維持有效；另可由功能模組管理頁指派非管理員管理者，於自身教職員頁使用管理面板"];
    }, {
        readonly version: "0.0.12";
        readonly releasedAt: "2026-10-23";
        readonly notes: ["給學生的說明：按 Enter 分段、儲存（與離開欄位）時自動標號 1. 2. 3. …，並提供插入範本"];
    }, {
        readonly version: "0.0.11";
        readonly releasedAt: "2026-10-23";
        readonly notes: ["審核人員選擇增加屬性下拉過濾與姓名搜尋"];
    }, {
        readonly version: "0.0.10";
        readonly releasedAt: "2026-10-23";
        readonly notes: ["審核人員改為當期教職員名冊選擇（不依屬性過濾），移除手動輸入 uid"];
    }, {
        readonly version: "0.0.9";
        readonly releasedAt: "2026-10-23";
        readonly notes: ["節次行程表格說明精簡為「勾選，表示該日該節為校內彈性學習時間」"];
    }, {
        readonly version: "0.0.8";
        readonly releasedAt: "2026-10-23";
        readonly notes: ["管理端「節次行程」改為格狀表格：橫排上課日（取自課表作息的上課星期）、直排節次，格子勾選即時寫入，取代星期下拉＋文字加入", "主程式課表作息新增「上課星期」欄位；模組只讀不寫"];
    }, {
        readonly version: "0.0.7";
        readonly releasedAt: "2026-10-23";
        readonly notes: ["管理端「節次行程」改為依主程式「學校基本設定 → 課表作息時間」勾選節次（不再手打文字）；尚未建立作息時提示先去建立", "管理端「開放場域」新增場域時以主程式「樓層空間設定」的葉子空間為下拉建議，仍可自行輸入自訂場域名稱"];
    }, {
        readonly version: "0.0.6";
        readonly releasedAt: "2026-10-23";
        readonly notes: ["兩種週數形式的填寫上限統一為程式判斷的學期總週數（上課日／學期起訖自動推算）；彈性形式不再「未設上限」", "管理端兩種形式的說明皆加註：扣除國定假日與學校重要行程後，依實際週數為總週數"];
    }, {
        readonly version: "0.0.5";
        readonly releasedAt: "2026-10-23";
        readonly notes: ["管理端全學期週數提示精簡：改為「根據學期設定，由程式自動判斷，本學期共 N 週」"];
    }, {
        readonly version: "0.0.4";
        readonly releasedAt: "2026-10-23";
        readonly notes: ["全學期週數改為優先依「上課日」起訖推算（其次學期起訖、再次學年度起訖）——教師與學生的週數對齊實際授课期間", "週計算改為台灣公家機關慣例：週日為每週第一日、週六為最後日，第一週或最後一週未滿七日仍以一週計（學校通常為 21 或 22 週，修正先前單純天數÷7 的偏差）"];
    }, {
        readonly version: "0.0.3";
        readonly releasedAt: "2026-10-23";
        readonly notes: ["移除「全學期週數（課綱為 21 或 22 週）」人工設定——上限週數受假期與定期考試影響並不固定；全學期形式的週數改由系統依「學校基本設定 → 學期起訖設定」的學期起訖自動推算（getFullWeeks），設定檔不再有 maxWeeks 欄位（舊值自動忽略）", "保留「全學期空白週數都須填寫」與「全學期採彈性週數填寫」兩種形式；彈性形式仍有下限週數進階欄位，且未設填寫上限（伺服器防濫用硬上限 104 週）", "學校尚未設定學期起訖時，全學期形式無法送出審核，訊息會提示改用彈性形式或先填寫學期起訖"];
    }, {
        readonly version: "0.0.2";
        readonly releasedAt: "2026-10-23";
        readonly notes: ["管理頁更名「管理規則」，「開放撰寫時間」卡新增功能總開關——關閉時學生／教職員／家長頁面只顯示「目前此功能關閉維護中」，寫入 API 一律 403，管理端不受影響", "週數改兩種填寫形式：全學期空白週數都須填寫（預設）／全學期採彈性週數填寫（下限週數預設 6、建議至少 6 週）；草稿可分次儲存，送出審核才強制週數形式與每週必填", "四身分頁一級區塊改用主程式 content-width（80vw）比照功能首頁，表單控制項統一 rounded px-3 py-2 text-sm", "README 與開發規劃書同步新欄位（enabled／weekMode／minWeeks）"];
    }, {
        readonly version: "0.0.1";
        readonly releasedAt: "2026-10-23";
        readonly notes: ["首版：四身分頁面（管理端設定、學生填報送審、教職員審核與兼導師瀏覽全班、家長檢視）", "狀態機草稿→審核中→通過／退回，審查意見保留多輪歷程", "管理端儲存設定同步公告與行事曆（開放時間掛勾）", "資料集合：selfDirectedLearningSettings／Plans／Reviews；限流 4 桶、稽核 4 項"];
    }];
}];
