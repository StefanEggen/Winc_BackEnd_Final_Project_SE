import { PrismaClient } from "@prisma/client";

const deleteUserById = async (id) => {
  const prisma = new PrismaClient();

  // Check if the user exists
  const userExists = await prisma.user.findUnique({
    where: { id },
  });
  if (!userExists) {
    return null; // User not found
  }

  // Delete related reviews
  await prisma.review.deleteMany({
    where: { userId: id },
  });

  // Delete related bookings
  await prisma.booking.deleteMany({
    where: { userId: id },
  });

  // Delete the user
  const user = await prisma.user.delete({
    where: { id },
  });

  return user.id; // Return the deleted user's ID
};

export default deleteUserById;