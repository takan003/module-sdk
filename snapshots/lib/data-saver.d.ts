/** 型別快照：宿主 @/lib/data-saver（省流開關 hook；契約增補 0.392） */

export interface DataSaverState {
  /** 已併入預設值的系統設定（寬鬆型別） */
  settings: Record<string, unknown>;
  /** 設定是否已判定（讀取失敗亦視為已判定） */
  ready: boolean;
  /** 省流開關是否啟用 */
  saverOn: boolean;
}

export function useDataSaver(): DataSaverState;
