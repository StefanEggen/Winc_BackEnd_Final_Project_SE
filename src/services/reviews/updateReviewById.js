import { Prisma } from "@prisma/client";

const updateReviewById = async (id, updatedReview) => {
  const prisma = new Prisma();
  const review = await prisma.review.update({
    where: { id },
    data: updatedReview,
  });

  return review.count > 0 ? id : null;
};

export default updateReviewById;
