import { PrismaClient } from "@prisma/client";

const updateReviewById = async (id, propertyId, userId, rating, comment) => {
  const prisma = new PrismaClient();

  // Check if the review exists
  const existingReview = await prisma.review.findUnique({
    where: { id },
  });
  if (!existingReview) {
    return null;
  }

  // Update the review
  const updatedReview = await prisma.review.update({
    where: { id },
    data: {
      propertyId,
      userId,
      rating,
      comment,
    },
  });

  return updatedReview;
};

export default updateReviewById;
