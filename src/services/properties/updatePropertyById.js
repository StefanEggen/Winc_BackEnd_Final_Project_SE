import { PrismaClient } from "@prisma/client";

const updatePropertyById = async (
  id,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating
) => {
  const prisma = new PrismaClient();

  // Check if the property exists
  const existingProperty = await prisma.property.findUnique({
    where: { id },
  });
  if (!existingProperty) {
    throw new Error(`Property with id ${id} not found`);
  }

  // Update the property
  const updatedProperty = await prisma.property.update({
    where: { id },
    data: {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    },
  });

  return updatedProperty;
};

export default updatePropertyById;
