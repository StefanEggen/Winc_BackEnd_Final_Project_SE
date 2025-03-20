import { Prisma } from "@prisma/client";

const updateBookingById = async (id, updatedBooking) => {
  const prisma = new Prisma();
  const booking = await prisma.booking.update({
    where: { id },
    data: updatedBooking,
  });

  return booking.count > 0 ? id : null;
};

export default updateBookingById;
