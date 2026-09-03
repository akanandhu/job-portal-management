import type { ReactNode } from "react";
import { Provider } from "react-redux";

import { store } from "@/app/store";

type StoreProviderPropsI = {
  children: ReactNode;
};

export function StoreProvider({ children }: StoreProviderPropsI) {
  return <Provider store={store}>{children}</Provider>;
}
