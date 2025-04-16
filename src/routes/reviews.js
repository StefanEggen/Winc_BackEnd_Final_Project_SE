import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import getReviewById from "../services/reviews/getReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const requiredFields = ["rating", "comment"];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ error: `These fields are required: ${missingFields}` });
    }

    const { propertyId, userId, rating, comment } = req.body;

    const newReview = await createReview(propertyId, userId, rating, comment);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);

    if (!review) {
      res.status(404).json({ error: "Review with id ${id} not found" });
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const requiredFields = ["rating", "comment"];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ error: `These fields are required: ${missingFields}` });
    }

    const { id } = req.params;
    const { propertyId, userId, rating, comment } = req.body;
    const updatedReview = await updateReviewById(
      id,
      propertyId,
      userId,
      rating,
      comment
    );

    if (!updatedReview) {
      return res.status(404).json({ error: `Review with id ${id} not found` });
    }

    res
      .status(200)
      .send({ message: `Review with id ${id} successfully updated` });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedReview = await deleteReviewById(id);

    if (deletedReview) {
      res
        .status(200)
        .send({ message: "Review with id ${id} successfully deleted" });
    } else {
      res.status(404).json({ error: "Review with id ${id} not found" });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
