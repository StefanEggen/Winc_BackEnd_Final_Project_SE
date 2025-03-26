import { PrismaClient } from "@prisma/client";

const deleteHostById = async (id) => {
  const prisma = new PrismaClient();

  // Check if the host exists
  const host = await prisma.host.findUnique({
    where: { id },
  });

  if (!host) {
    return null; // Return null if the host does not exist
  }

  // Delete associated properties (if necessary)
  await prisma.property.deleteMany({
    where: { hostId: id },
  });

  // Delete the host
  const deletedHost = await prisma.host.delete({
    where: { id },
  });

  return deletedHost.id; // Return the deleted host's ID
};

export default deleteHostById;
