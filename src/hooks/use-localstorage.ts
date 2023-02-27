import { useState } from "react";

function isJson(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

// Hook
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      if (item) {
        return isJson(item) ? JSON.parse(item) : item;
      } else {
        return initialValue;
      }
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        let value =
          typeof valueToStore !== "string" && valueToStore
            ? JSON.stringify(valueToStore)
            : valueToStore;
        window.localStorage.setItem(key, value as any);
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  const removeValue = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  };
  return {
    setValue,
    removeValue,
    value: storedValue,
  };
}
