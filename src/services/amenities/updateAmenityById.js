import { PrismaClient } from "@prisma/client";

const updateAmenityById = async (id, name) => {
  const prisma = new PrismaClient();

  // Check if the amenity exists
  const existingAmenity = await prisma.amenity.findUnique({
    where: { id },
  });
  if (!existingAmenity) {
    throw new Error(`Amenity with id ${id} not found`);
  }

  // Update the amenity
  const updatedAmenity = await prisma.amenity.update({
    where: { id },
    data: { name },
  });

  return updatedAmenity;
};

export default updateAmenityById;
