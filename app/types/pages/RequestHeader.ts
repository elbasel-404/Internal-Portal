import { ReactNode } from "react";
import type { RequestLabel } from "@types";

export type RequestHeader = {
  label: RequestLabel;
  value: ReactNode | [] | File[];
  key?: string;
  tableHeaders?: { label: string; key: string }[]
};
