import { PrismaClient } from "@prisma/client";

const getPropertyById = async (filters) => {
  const prisma = new PrismaClient();

  // If the `id` filter is provided, use `findUnique` to fetch a single property
  if (filters.id) {
    const property = await prisma.property.findUnique({
      where: { id: filters.id },
      include: {
        amenities: true, // Include related amenities in the result
      },
    });
    return property; // Return a single property object
  }

  // Build the dynamic filter object for `findMany`
  const where = {};
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

  return properties; // Return an array of properties
};

export default getPropertyById;
