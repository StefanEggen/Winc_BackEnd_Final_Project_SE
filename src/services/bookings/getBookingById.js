import { PrismaClient } from "@prisma/client";

const getBookingById = async (value, field = "id") => {
  const prisma = new PrismaClient();

  // Use findMany for non-unique fields like "userId"
  if (field === "userId") {
    const bookings = await prisma.booking.findMany({
      where: { userId: value }, // Explicitly filter by userId
    });
    return bookings;
  }

  // Use findUnique for unique fields like "id"
  const booking = await prisma.booking.findUnique({
    where: { id: value }, // Explicitly filter by id
  });

  return booking;
};

export default getBookingById;