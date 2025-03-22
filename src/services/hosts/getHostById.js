import { PrismaClient } from "@prisma/client";

const getHostById = async (value, field = "id") => {
  const prisma = new PrismaClient();

  // Use findFirst for non-unique fields like "name"
  if (field === "name") {
    const normalizedValue = value.toLowerCase(); // Normalize the input value
    const host = await prisma.host.findFirst({
      where: {
        name: {
          contains: normalizedValue, // Perform a partial match
        },
      },
    });
    return host;
  }

  // Use findUnique for unique fields like "id" or "username"
  const host = await prisma.host.findUnique({
    where: { [field]: value },
  });

  return host;
};

export default getHostById;
