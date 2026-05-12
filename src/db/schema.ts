import { mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";

export const pattern = mysqlTable("pattern", {
  id: serial("id").primaryKey(),
  patternName: varchar("pattern_name", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date(Date.now())),
});
