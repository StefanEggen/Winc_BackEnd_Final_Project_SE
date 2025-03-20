import { Prisma } from "@prisma/client";

const getAmenities = async () => {
  const prisma = new Prisma();
  const amenities = await prisma.amenity.findMany();

  return amenities;
};

export default getAmenities;