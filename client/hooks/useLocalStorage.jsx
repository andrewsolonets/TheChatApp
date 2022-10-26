import React, { useDebugValue, useEffect, useState } from "react";

const PREFIX = "thechatapp-";

export default function useLocalStorage(key, initialState) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(initialState);
  useDebugValue(value);

  useEffect(() => {
    const item = localStorage.getItem(prefixedKey);
    if (item) setValue(parse(item));
    if (typeof initialState === "function") {
      return initialState();
    } else {
      return initialState;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}

const parse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
