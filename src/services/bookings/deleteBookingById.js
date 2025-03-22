import { PrismaClient } from "@prisma/client";

const deletebookingById = async (id) => {
  const prisma = new PrismaClient();
  const booking = await prisma.booking.deleteMany({
    where: { id },
  });

  return booking.count > 0 ? id : null;
};

export default deletebookingById;