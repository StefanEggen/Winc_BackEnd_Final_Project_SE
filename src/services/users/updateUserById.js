import { PrismaClient } from "@prisma/client";

const updateUserById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();

  // Check if the user exists
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!existingUser) {
    return null;
  }

  // Update the user
  const updatedUser = await prisma.user.updateMany({
    where: { id },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });

  return updatedUser;
};

export default updateUserById;
