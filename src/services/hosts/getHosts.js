import { Prisma } from "@prisma/client";

const getHosts = async () => {
  const prisma = new Prisma();
  const hosts = await prisma.host.findMany();

  return hosts;
};  

export default getHosts;