import { PrismaClient } from "@prisma/client";

const getUserById = async (value, field = "id") => {
  const prisma = new PrismaClient();

  // Use findFirst for non-unique fields like "email"
  if (field === "email") {
    const user = await prisma.user.findFirst({
      where: { email: value },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
      },
    });
    return user;
  }

  // Use findUnique for unique fields like "id" or "username"
  const user = await prisma.user.findUnique({
    where: { [field]: value },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
    }
  });

  return user;
};

export default getUserById;
