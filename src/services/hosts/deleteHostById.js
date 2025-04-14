import { PrismaClient } from "@prisma/client";

const deleteHostById = async (id) => {
  const prisma = new PrismaClient();

  // Check if the host exists
  const hostExists = await prisma.host.findUnique({
    where: { id },
  });
  if (!hostExists) {
    return null; // Host not found
  }

  // Delete related reviews and bookings for each property
  const properties = await prisma.property.findMany({
    where: { hostId: id },
  });

  for (const property of properties) {
    await prisma.review.deleteMany({
      where: { propertyId: property.id },
    });

    await prisma.booking.deleteMany({
      where: { propertyId: property.id },
    });
  }

  // Delete related properties
  await prisma.property.deleteMany({
    where: { hostId: id },
  });

  // Delete the host
  const host = await prisma.host.delete({
    where: { id },
  });

  return host.id; // Return the deleted host's ID
};

export default deleteHostById;