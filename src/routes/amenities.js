import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import createAmenity from "../services/amenities/createAmenity.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const amenities = await getAmenities();
    res.json(amenities);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const requiredFields = ["name"];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ error: `These fields are required: ${missingFields}` });
    }

    const { name } = req.body;
    const newAmenity = await createAmenity(name);
    res.status(201).json(newAmenity);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await getAmenityById(id);

    if (!amenity) {
      res.status(404).json({ error: `Amenity with id ${id} not found` });
    } else {
      res.status(200).json(amenity);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const requiredFields = ["name"];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ error: `These fields are required: ${missingFields}` });
    }

    const { id } = req.params;
    const { name } = req.body;

    const updatedAmenity = await updateAmenityById(id, name);

    if (!updatedAmenity) {
      return res.status(404).json({ error: `Amenity with id ${id} not found` });
    }

    res
      .status(200)
      .send({ message: `Amenity with id ${id} successfully updated` });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAmenity = await deleteAmenityById(id);

    if (deletedAmenity) {
      res
        .status(200)
        .send({ message: `Amenity with id ${id} successfully deleted` });
    } else {
      res.status(404).json({ error: `Amenity with id ${id} not found` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
