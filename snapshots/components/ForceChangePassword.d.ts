/**
 * 首次登入強制修改密碼的全螢幕遮罩（掛在 ClientLayout，涵蓋所有身分頁）。
 * 旗標＝使用者文件的 mustChangePassword（管理員建立帳號／重設密碼時標記），
 * 本人改密或一次性連結重設後清除，重新取 session 即自動消失。
 * 只影響畫面：未取得 session、讀不到旗標時一律放行（不擋）。
 */
export default function ForceChangePassword(): import("react").JSX.Element | null;
