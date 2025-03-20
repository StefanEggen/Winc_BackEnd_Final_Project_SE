import { Prisma } from "@prisma/client";

const updatePropertyById = async (id, updatedProperty) => {
  const prisma = new Prisma();
  const property = await prisma.property.update({
    where: { id },
    data: updatedProperty,
  });

  return property.count > 0 ? id : null;
};

export default updatePropertyById;