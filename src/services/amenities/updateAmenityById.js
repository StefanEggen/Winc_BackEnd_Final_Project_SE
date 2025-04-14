import { PrismaClient } from "@prisma/client";

const updateAmenityById = async (id, name) => {
  const prisma = new PrismaClient();

  // Check if the amenity exists
  const existingAmenity = await prisma.amenity.findUnique({
    where: { id },
  });
  if (!existingAmenity) {
    return null;
  }

  // Update the amenity
  const updatedAmenity = await prisma.amenity.update({
    where: { id },
    data: { name },
  });

  return updatedAmenity;
};

export default updateAmenityById;
