import { PrismaClient } from "@prisma/client";

const updateHostById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();

  // Check if the host exists
  const existingHost = await prisma.host.findUnique({
    where: { id },
  });
  if (!existingHost) {
    throw new Error(`Host with id ${id} not found`);
  }

  // Update the host
  const updatedHost = await prisma.host.update({
    where: { id },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    },
  });

  return updatedHost;
};

export default updateHostById;
