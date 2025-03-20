import { Prisma } from "@prisma/client";

const deletebookingById = async (id) => {
  const prisma = new Prisma();
  const booking = await prisma.booking.deleteMany({
    where: { id },
  });

  return booking.count > 0 ? id : null;
};

export default deletebookingById;