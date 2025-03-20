import { Prisma } from "@prisma/client";

const updateAmenityById = async (id, updatedAmenity) => {
  const prisma = new Prisma();
  const amenity = await prisma.amenity.update({
    where: { id },
    data: updatedAmenity,
  });

  return amenity.count > 0 ? id : null;
};

export default updateAmenityById;