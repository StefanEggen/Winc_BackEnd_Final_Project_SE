import { Prisma } from "@prisma/client";

const getBookings = async () => {
  const prisma = new Prisma();
  const bookings = await prisma.booking.findMany();

  return bookings;
};

export default getBookings;