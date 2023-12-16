import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { z } from "zod";

export default async function Categories() {
  const { userId } = auth();
  if (!userId) throw new Error("Not logged in");
  const categories = await prisma.categories.findMany({
    where: {
      userId,
    },
  });
  return (
    <>
      <form
        action={async (formData) => {
          "use server";
          const name = z.string().parse(formData.get("name"));
          if (!userId) throw new Error("Not logged in");
          await prisma.categories.create({
            data: {
              name,
              userId,
            },
          });
        }}
      >
        <input name="name" />
        <label>Name</label>
      </form>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </>
  );
}
