import { PrismaClient } from "@prisma/client";

const updateAmenityById = async (id, name) => {
  const prisma = new PrismaClient();
  const updatedAmenity = await prisma.amenity.update({
    where: { id },
    data: { name },
  });

  return updatedAmenity;
};

export default updateAmenityById;
