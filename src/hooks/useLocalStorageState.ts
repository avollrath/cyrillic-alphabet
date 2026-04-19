import { useEffect, useState } from "react";
import { loadStorage, saveStorage } from "../utils/storage";

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => loadStorage(key, initialValue));

  useEffect(() => {
    saveStorage(key, state);
  }, [key, state]);

  return [state, setState] as const;
}
