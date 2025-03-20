import { Prisma } from "@prisma/client";

const deleteReviewById = async (id) => {
  const prisma = new Prisma();
  const review = await prisma.review.deleteMany({
    where: { id },
  });

  return review.count > 0 ? id : null;
};

export default deleteReviewById;