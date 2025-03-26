import { PrismaClient } from "@prisma/client";

const updateReviewById = async (id, propertyId, userId, rating, comment) => {
  const prisma = new PrismaClient();
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
