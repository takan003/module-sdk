/** 型別快照：宿主 @/lib/module-host-data（選用模組的學校設定唯讀公開面） */

export interface SchoolPeriodRow {
  code: string;
  period: number;
  name: string;
  start: string;
  end: string;
}

export interface SchoolPeriodsSetting {
  schoolDays: number[];
  periods: SchoolPeriodRow[];
}

export interface SpaceUnit {
  code: string;
  name: string;
  nameEn: string;
  spaceCode: string;
  floor: string;
  level: number;
  parent: string | null;
  orgUnit: string | null;
  openForBooking: boolean;
  capacity: number | null;
  notes: string;
}

export interface SpaceStructure {
  levelCount: number;
  levelLabels: string[];
  units: SpaceUnit[];
}

export interface ClassRow {
  id: string;
  code: string;
  name: string;
}

export interface GradeRow {
  id: string;
  grade: number;
  code: string;
  name: string;
  classes: ClassRow[];
}

export interface SchoolClassesSetting {
  grades: GradeRow[];
  nameStyle: "local" | "global";
}

export function getSchoolPeriodsSetting(): Promise<SchoolPeriodsSetting>;
export function getSchoolSpaceStructure(): Promise<SpaceStructure>;
export function getSchoolClassesSetting(): Promise<SchoolClassesSetting>;
