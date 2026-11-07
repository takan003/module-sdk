/**
 * 學期起訖設定編輯器（學校基本設定的子功能，危險區）。
 * 自行讀取與儲存 `GET/PUT /api/admin/school/semesters`（merge 部分更新）；
 * 沿用校務基本資料的 saved／draft 模式：還原與儲存共用同一份未儲存狀態。
 */
export default function SchoolSemesterSettingsEditor(): import("react").JSX.Element | null;
