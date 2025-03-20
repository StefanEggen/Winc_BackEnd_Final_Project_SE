import { Prisma } from "@prisma/client";

const deleteAmenityById = async (id) => {
  const prisma = new Prisma();
  const amenity = await prisma.amenity.deleteMany({
    where: { id },
  });

  return amenity.count > 0 ? id : null;
};

export default deleteAmenityById;
