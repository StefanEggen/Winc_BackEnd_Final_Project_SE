import { Prisma } from "@prisma/client";

const deletePropertyById = async (id) => {
  const prisma = new Prisma();
  const property = await prisma.property.deleteMany({
    where: { id },
  });

  return property.count > 0 ? id : null;
};

export default deletePropertyById;
