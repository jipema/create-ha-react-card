import { Panel } from "custom-card-helpers";
export interface Omit {
    <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
        [K2 in Exclude<keyof T, K[number]>]: T[K2];
    };
}
export declare const omit: Omit;
export declare function isPanelValue(value: unknown): value is Panel;
