import { inngest } from "./client";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { NewUser, usersTable } from "../db/schema";
// https://github.com/clerk/javascript/blob/main/packages/types/src/json.ts
import type { UserJSON, DeletedObjectJSON } from "@clerk/types";

export const userCreated = inngest.createFunction(
  { id: "sync-clerk-user-created" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    // The event payload's data will be the Clerk User json object
    const user: UserJSON = event.data;
    const { id, first_name, last_name, image_url } = user;

    const email: string =
      user.email_addresses.find((e) => e.id === user.primary_email_address_id)
        ?.email_address || user.email_addresses[0].email_address;

    const clerkUser: NewUser = {
      clerkId: id,
      name: `${first_name} ${last_name}`,
      email,
      image: image_url,
    };
    await db
      .insert(usersTable)
      .values(clerkUser)
      .onConflictDoUpdate({
        target: usersTable.clerkId,
        set: {
          name: clerkUser.name,
          email: clerkUser.email,
          image: clerkUser.image,
        },
      });
  },
);

export const userUpdated = inngest.createFunction(
  { id: "sync-clerk-user-updated" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    // The event payload's data will be the Clerk User json object
    const user: UserJSON = event.data;
    const { id, first_name, last_name, image_url } = user;

    const email: string | undefined = user.email_addresses.find(
      (e) => e.id === user.primary_email_address_id,
    )?.email_address;

    await db
      .update(usersTable)
      .set({
        name: `${first_name} ${last_name}`,
        email,
        image: image_url,
      })
      .where(eq(usersTable.clerkId, id));
  },
);

export const userDeleted = inngest.createFunction(
  { id: "sync-clerk-user-deleted" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    // The event payload's data will be the Clerk User json object
    const user: DeletedObjectJSON = event.data;
    const { id } = user;

    await db.delete(usersTable).where(eq(usersTable.clerkId, id));
    // soft delete system
    // await db
    //   .update(usersTable)
    //   .set({
    //     deleted: true,
    //   })
    //   .where(eq(usersTable.clerkId, id));
  },
);
