import { Prisma } from "@prisma/client";

const getBookingById = async (id) => {
  const prisma = new Prisma();
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  return booking;
};

export default getBookingById;