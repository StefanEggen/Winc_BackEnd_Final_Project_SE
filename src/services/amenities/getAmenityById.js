import { Prisma } from "@prisma/client";

const getAmenityById = async (id) => {
  const prisma = new Prisma();
  const amenity = await prisma.amenity.findUnique({
    where: { id },
  });

  return amenity;
};

export default getAmenityById;
