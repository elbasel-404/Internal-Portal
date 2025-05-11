import type { DatabaseData } from "@db/types";
import { JSONFilePreset } from "lowdb/node";

const defaultData: DatabaseData = {
  users: [],
  userCount: 0,
};

export const db = await JSONFilePreset<DatabaseData>(
  "./app/db/db.json",
  defaultData
);