import type { JSX, ReactNode } from "react";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

interface Props {
  children: ReactNode;
}

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function MaterialRTLProvider({ children }: Props): JSX.Element {
  return <CacheProvider value={rtlCache}>{children}</CacheProvider>;
}
