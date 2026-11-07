declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}
/** 廣告版位定義：每個頁面的廣告區固定投遞兩則廣告 */
export interface AdUnit {
    /** AdSense 廣告帳號（ca-pub-...） */
    client: string;
    /** 廣告版位 ID */
    slot: string;
    /** <ins> 尺寸樣式 */
    style: React.CSSProperties;
    /** 廣告格式（例：auto） */
    format?: string;
    /** 是否隨容器自適應寬度 */
    fullWidthResponsive?: boolean;
}
/** 全站廣告區共用的兩則廣告 */
export declare const AD_UNITS: AdUnit[];
export default function AdSense({ units }: {
    units?: AdUnit[];
}): import("react").JSX.Element;
