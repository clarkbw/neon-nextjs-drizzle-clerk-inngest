import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { userCreated, userDeleted, userUpdated } from "@/inngest/clerk";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [userCreated, userUpdated, userDeleted],
});
