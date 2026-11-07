/**
 * 年段班級設定編輯器（學校基本設定的子功能）。
 * 自行讀取與儲存 `GET/PUT /api/admin/school/classes`；
 * 沿用校務基本資料的 saved／draft 模式：還原與儲存共用同一份未儲存狀態。
 * 學制與年制（上限）由 GET 一併回傳，取自校務基本資料。
 */
export default function SchoolClassesEditor(): import("react").JSX.Element | null;
