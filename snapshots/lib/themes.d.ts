import { Theme, ThemeId } from '@/types/theme';
export declare const builtinThemes: Theme[];
export declare function getThemeById(id: ThemeId | string): Theme | undefined;
export declare const defaultTheme: Theme;
