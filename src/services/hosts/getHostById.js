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
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        aboutMe: true,
      },
    });
    return host;
  }

  // Use findUnique for unique fields like "id" or "username"
  const host = await prisma.host.findUnique({
    where: { [field]: value },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      aboutMe: true,
    }
  });

  return host;
};

export default getHostById;
