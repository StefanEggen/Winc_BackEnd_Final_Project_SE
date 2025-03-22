import { PrismaClient } from "@prisma/client";

const getBookingById = async (value, field = "id") => {
  const prisma = new PrismaClient();

  // Use findMany for non-unique fields like "userId"
  if (field === "userId") {
    const bookings = await prisma.booking.findMany({
      where: { [field]: value },
    });
    return bookings;
  }

  // Use findUnique for unique fields like "id"
  const booking = await prisma.booking.findUnique({
    where: { [field]: value },
  });

  return booking;
};

export default getBookingById;