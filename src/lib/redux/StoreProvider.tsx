"use client";

import type { AppStore } from "./store";
import type { ReactNode } from "react";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";

interface Props {
  children: Readonly<ReactNode>;
}

export default function StoreProvider({ children }: Props) {
  const ref = useRef<AppStore>(null);
  if (!ref.current) {
    ref.current = makeStore();
  }

  return <Provider store={ref.current}>{children}</Provider>;
}
