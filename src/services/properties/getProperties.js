import { Prisma } from "@prisma/client";

const getProperties = async () => {
  const prisma = new Prisma();
  const properties = await prisma.property.findMany();

  return properties;
};

export default getProperties;