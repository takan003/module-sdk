export interface ThemeSubmissionInitialValues {
    id?: string;
    name?: string;
    description?: string;
    tags?: string[];
    colors?: Record<string, string>;
}
export default function ThemeSubmissionForm({ endpoint, submitLabel, initialValues, }: {
    endpoint: string;
    submitLabel: string;
    initialValues?: ThemeSubmissionInitialValues;
}): import("react").JSX.Element;
