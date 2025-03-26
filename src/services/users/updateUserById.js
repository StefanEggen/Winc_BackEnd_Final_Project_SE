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
