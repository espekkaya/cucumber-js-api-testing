// https://stackoverflow.com/a/36636368

export interface Paths {
    allureExecutor: string;
    allureCategories: string;
    allureProperties: string;
    allureResult: string;
    environmentJson: string;
    featuresSummary: string;
    reportZip: string;
}

export interface Scn {
    Feature: string;
    Scenario: string;
    Environment: string;
}

export interface Environment {
    SuitesId?: number;
    ExecutionStartDate: string;
    TestStatus: {
        PASSED: number;
        FAILED: number;
        SKIPPED: number;
        PENDING: number;
        FAILED_SCN: Scn[];
        SKIPPED_SCN: Scn[];
        PASSED_SCN: Scn[];
    };
}

export interface FeatureFile {
    Path: string;
    LineCounter: number;
}