import { authMiddleware } from "@clerk/nextjs";
import { z } from "zod";

const allowedUsers = z
  .string()
  .transform((val) => z.array(z.string()).parse(JSON.parse(val)))
  .parse(process.env.ALLOWED_USERS);

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  afterAuth({ userId }) {
    if (userId && allowedUsers.includes(userId)) {
      return;
    }
    console.log("User ID not recognized", userId);
    return new Response("User ID not recognized", {
      status: 403,
      statusText: "Forbidden",
    });
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
