import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";
import createBooking from "../services/bookings/createBooking.js";
import getBookingById from "../services/bookings/getBookingById.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import auth from "../middleware/auth.js";
import { validate as isUuid } from "uuid";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.query;

    if (userId) {
      // Use getBookingById to fetch bookings by userId
      const bookings = await getBookingById(userId, "userId");
      if (bookings && bookings.length > 0) {
        return res.json(bookings);
      } else {
        return res
          .status(404)
          .json({ error: `No bookings found for userId ${userId}` });
      }
    }

    // If no userId is provided, return all bookings
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

    if (!isUuid(id)) {
      return res.status(404).json({ error: `Booking with id ${id} not found` });
    }

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

    if (!isUuid(id)) {
      return res.status(404).json({ error: "Booking with id ${id} not found" });
    }

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
