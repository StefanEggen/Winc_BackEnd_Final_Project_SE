import { Prisma } from "@prisma/client";

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const newHost = {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  };

  const prisma = new Prisma();
  const host = await prisma.host.create({
    data: newHost,
  });

  return host;
};

export default createHost;
