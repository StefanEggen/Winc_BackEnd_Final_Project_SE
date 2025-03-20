import { Router } from "express";
import { getBookings } from "../services/bookings";
import { createBooking } from "../services/bookings";
import { getBookingById } from "../services/bookings";
import { updateBookingById } from "../services/bookings";
import { deleteBookingById } from "../services/bookings";
import auth from "../middleware/auth";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const bookings = await getBookings();
    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    const newBooking = await createBooking(
      userId,
      propertyId,
      new Date(checkinDate),
      new Date(checkoutDate),
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);
    if (!booking) {
      res.status(404).json({ error: `Booking with id ${id} not found` });
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    const updatedBooking = await updateBookingById(
      id,
      userId,
      propertyId,
      new Date(checkinDate),
      new Date(checkoutDate),
      numberOfGuests,
      totalPrice,
      bookingStatus
    );

    if (updatedBooking) {
      res.status(200).send({
        message: `Booking with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({ error: `Booking with id ${id} not found` });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBooking = await deleteBookingById(id);

    if (deletedBooking) {
      res.status(200).send({
        message: `Booking with id ${id} successfully deleted`,
      });
    } else {
      res.status(404).json({ error: `Booking with id ${id} not found` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
