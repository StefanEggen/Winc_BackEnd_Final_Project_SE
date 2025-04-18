import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import createProperty from "../services/properties/createProperty.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight, amenities } = req.query;

    // Use getPropertyById to fetch properties based on filters
    const filters = { location, pricePerNight, amenities };
    const properties = await getPropertyById(filters);

    if (properties.length > 0) {
      res.json(properties);
    } else {
      res
        .status(404)
        .json({ error: "No properties found matching the filters" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const requiredFields = [
      "title",
      "description",
      "location",
      "pricePerNight",
      "bedroomCount",
      "bathRoomCount",
      "maxGuestCount",
      "hostId",
      "rating",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ error: `These fields are required: ${missingFields}` });
    }

    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;

    const newProperty = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    );
    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById({ id });

    if (!property) {
      res.status(404).json({ error: `Property with id ${id} not found` });
    } else {
      res.status(200).json(property);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const requiredFields = [
      "title",
      "description",
      "location",
      "pricePerNight",
      "bedroomCount",
      "bathRoomCount",
      "maxGuestCount",
      "rating",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ error: `These fields are required: ${missingFields}` });
    }

    const { id } = req.params;

    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;
    const updatedProperty = await updatePropertyById(
      id,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    );

    if (!updatedProperty) {
      return res
        .status(404)
        .json({ error: `Property with id ${id} not found` });
    }

    res
      .status(200)
      .send({ message: `Property with id ${id} successfully updated` });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedProperty = await deletePropertyById(id);

    if (!deletedProperty) {
      return res
        .status(404)
        .json({ error: `Property with id ${id} not found` });
    }

    res
      .status(200)
      .send({ message: `Property with id ${id} successfully deleted` });
  } catch (error) {
    next(error);
  }
});

export default router;
