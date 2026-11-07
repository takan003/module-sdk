/**
 * 上傳前的瀏覽器端縮圖：學生常直接選照相館原檔（2 MB 以上很常見），
 * 在送出前縮到可負擔的大小並轉成 JPEG，順帶把 EXIF（含拍攝地點）留在瀏覽器。
 *
 * 只用瀏覽器原生 API，不引入任何相依套件。
 */
/**
 * 把學生選的檔案縮成符合上限的 JPEG。
 * 若原本就已經夠小，仍會重新編碼一次（確保格式一致並移除 EXIF）。
 *
 * @throws 無法解碼時拋出可直接顯示給使用者的中文訊息。
 */
export declare function prepareStudentPhotoFile(file: File, maxBytes: number): Promise<File>;
