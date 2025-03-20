import { Prisma } from "@prisma/client";

const getPropertyById = async (id) => {
  const prisma = new Prisma();
  const property = await prisma.property.findUnique({
    where: { id },
  });

  return property;
};

export default getPropertyById;
