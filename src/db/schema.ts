import { pgTable, timestamp, text } from "drizzle-orm/pg-core";

/*
 * Clerk User
 * https://clerk.com/docs/reference/backend-api/tag/Users#operation/GetUser
 **/
export const usersTable = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  clerkId: text("clerk_id").unique(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("profile_image_url"),
});

export type User = typeof usersTable.$inferSelect; // return type when queried
export type NewUser = typeof usersTable.$inferInsert; // insert type
