import { PrismaClient } from "@prisma/client";

const updateBookingById = async (
  id,
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();

  // Check if the booking exists
  const existingBooking = await prisma.booking.findUnique({
    where: { id },
  });
  if (!existingBooking) {
    throw new Error(`Booking with id ${id} not found`);
  }

  // Update the booking
  const updatedBooking = await prisma.booking.update({
    where: { id },
    data: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });

  return updatedBooking;
};

export default updateBookingById;
