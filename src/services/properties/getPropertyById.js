import { PrismaClient } from "@prisma/client";

const getPropertyById = async (filters) => {
  const prisma = new PrismaClient();

  // Build the dynamic filter object
  const where = {};
  if (filters.id) {
    where.id = filters.id; // Exact match for id
  }
  if (filters.location) {
    where.location = {
      contains: filters.location, // Partial match for location
    };
  }
  if (filters.pricePerNight) {
    where.pricePerNight = parseFloat(filters.pricePerNight); // Exact match for price
  }
  if (filters.amenities) {
    where.amenities = {
      some: {
        name: filters.amenities, // Match if the related Amenity's name matches the filter
      },
    };
  }

  // Query the database with the dynamic filters
  const properties = await prisma.property.findMany({
    where,
    include: {
      amenities: true, // Include related amenities in the result
    },
  });

  return properties;
};

export default getPropertyById;
