/**
 * 身分啟用／停用面板（原「身分管理」頁，併入身分名冊管理頁頂端）。
 * 預設收合，管理員展開箭頭才讀取／顯示四張開關卡（首次展開才打 API）。
 * 開關存於系統設定（settings/system 的 roleEnabled），屬現行狀態、跨學期沿用。
 */
export default function RoleEnablePanel(): import("react").JSX.Element;
