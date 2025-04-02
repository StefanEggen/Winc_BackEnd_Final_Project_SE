import { PrismaClient } from "@prisma/client";

const deletePropertyById = async (id) => {
  const prisma = new PrismaClient();

  // Delete related reviews
  await prisma.review.deleteMany({
    where: { propertyId: id },
  });

  // Delete related bookings
  await prisma.booking.deleteMany({
    where: { propertyId: id },
  });

  // Delete the property
  const property = await prisma.property.delete({
    where: { id },
  });

  return property.id; // Return the deleted property's ID
};

export default deletePropertyById;