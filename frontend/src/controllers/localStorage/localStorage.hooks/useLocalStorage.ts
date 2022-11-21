import { useCallback, useEffect, useState } from 'react';
import { isBrowser } from '@/lib/isBrowser';
import { debounce } from '@/lib/debounce';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';

export function useLocalStorage<T>(
  key: string, initialValue: T, onInit: (value: T) => any = () => null,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(initialValue);
  const logger = useLogger({
    name: useLocalStorage.name,
  });

  const readFromLocalStorage = useCallback(() => {
    if (!isBrowser) {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) as T : initialValue;
    } catch (e) {
      logger.warning(
        `can't read initial value from localStorage, using initialValue`,
        { key, initialValue },
        e.message,
        e.stack,
      );

      return initialValue;
    }
  }, [key, initialValue, logger]);

  const writeToLocalStorage = debounce((value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      logger.warning(
        `[LOCAL STORAGE]: can't write value to localStorage`,
        { key, value },
        e.message,
        e.stack,
      );
    }
  });

  const setValue = useCallback((value: T) => {
    setStoredValue(value);
    writeToLocalStorage(value);
  }, [setStoredValue, writeToLocalStorage]);

  useEffect(
    () => {
      const value = readFromLocalStorage();

      setValue(value);
      onInit(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );

  return [storedValue, setValue];
}
