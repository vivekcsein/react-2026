// Helper functions to safely access localStorage (only in browser)

export function getLocalStorageItem<T>(key: string): T | null;
export function getLocalStorageItem<T>(key: string, fallback: T): T;

export function getLocalStorageItem<T>(key: string, fallback?: T) {
  if (typeof window === "undefined" || !window.localStorage) {
    return fallback ?? null;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (!item) return fallback ?? null;

    return JSON.parse(item) as T;
  } catch {
    return fallback ?? null;
  }
}

export const setLocalStorageItem = (key: string, value: unknown) => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};
export const removeLocalStorageItem = (key: string) => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.removeItem(key);
  }
};

export const putLocalStorageItem = (key: string, value: unknown) => {
  if (typeof window !== "undefined" && window.localStorage) {
    const existing = window.localStorage.getItem(key);
    let arr: unknown[] = [];
    if (existing) {
      try {
        arr = JSON.parse(existing);
        if (!Array.isArray(arr)) arr = [];
      } catch {
        arr = [];
      }
    }
    arr.push(value);
    window.localStorage.setItem(key, JSON.stringify(arr));
  }
};
