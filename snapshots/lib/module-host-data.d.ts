import "server-only";
import { type SchoolPeriodsSetting } from "@/types/school-periods";
import { type SpaceStructure } from "@/types/school-spaces";
import { type SchoolClassesSetting } from "@/types/school-classes";
/** 課表作息（settings/schoolPeriods）：上課星期與節次；缺檔回主程式內建預設 */
export declare function getSchoolPeriodsSetting(): Promise<SchoolPeriodsSetting>;
/** 樓層空間（settings/spaces）：層級與扁平空間清單；缺檔回主程式內建預設 */
export declare function getSchoolSpaceStructure(): Promise<SpaceStructure>;
/** 年段班級（settings/schoolClasses）：年段與班級清單；缺檔回主程式內建預設 */
export declare function getSchoolClassesSetting(): Promise<SchoolClassesSetting>;
