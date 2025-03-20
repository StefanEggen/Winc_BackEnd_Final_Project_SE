import { Prisma } from "@prisma/client";

const getReviews = async () => {
  const prisma = new Prisma();
  const reviews = await prisma.review.findMany();

  return reviews;
};

export default getReviews;