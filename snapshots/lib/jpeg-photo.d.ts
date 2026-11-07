export interface JpegPhotoProperties {
    width: number;
    height: number;
    precision: number;
    components: number;
    orientation: number;
}
/** 從 JPEG 標頭讀取尺寸、色彩分量與方向資訊。 */
export declare function inspectJpegPhoto(buffer: Buffer): JpegPhotoProperties | null;
