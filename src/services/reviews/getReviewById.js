import { Prisma } from "@prisma/client";

const getReviewById = async (id) => {
  const prisma = new Prisma();
  const review = await prisma.review.findUnique({
    where: { id },
  });

  return review;
};

export default getReviewById;