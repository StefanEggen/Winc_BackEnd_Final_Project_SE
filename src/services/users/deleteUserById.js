import { PrismaClient } from "@prisma/client";

const deleteUserById = async (id) => {
  const prisma = new PrismaClient();

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