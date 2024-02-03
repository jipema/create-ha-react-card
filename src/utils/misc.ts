import { Panel } from "custom-card-helpers";

export interface Omit {
  <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2];
  };
}

export const omit: Omit = (obj, ...keys) => {
  const ret = {} as {
    [K in keyof typeof obj]: (typeof obj)[K];
  };
  let key: keyof typeof obj;
  for (key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret;
};

export function isPanelValue(value: unknown): value is Panel {
  return (
    !!value && typeof value === "object" && "config" in value && !!value.config && typeof value.config === "object"
  );
}

export class Deferred {
  promise: Promise<undefined>;
  reject?: () => void;
  resolve?: (value: PromiseLike<undefined> | undefined) => void;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
}
