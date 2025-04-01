import { PrismaClient } from '@prisma/client'
import amenitiesData from '../src/data/amenities.json' with { type: 'json'}
import bookingsData from '../src/data/bookings.json' with { type: 'json'}
import hostsData from '../src/data/hosts.json' with { type: 'json'}
import propertiesData from '../src/data/properties.json' with { type: 'json'}
import reviewsData from '../src/data/reviews.json' with { type: 'json'}
import usersData from '../src/data/users.json' with { type: 'json'}

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })

async function main() {
    const { amenities } = amenitiesData
    const { bookings } = bookingsData
    const { hosts } = hostsData
    const { properties } = propertiesData
    const { reviews } = reviewsData
    const { users } = usersData

  // Seed users
  for (const user of users) {
    await prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user,
    });
  }

    // Seed reviews
    for (const review of reviews) {
      await prisma.review.upsert({
        where: { id: review.id },
        update: {},
        create: {
          ...review,
          userId: review.userId, // Use the userId from the JSON file
          propertyId: review.propertyId, // Use the propertyId from the JSON file
        },
      });

    // Seed bookings
    for (const booking of bookings) {
      await prisma.booking.upsert({
        where: { id: booking.id },
        update: {},
        create: {
          ...booking,
          userId: booking.userId, // Use the userId from the JSON file
          propertyId: booking.propertyId, // Use the propertyId from the JSON file
        },
      });
    }
    
    // Seed properties
    for (const property of properties) {
        await prisma.property.upsert({
            where: { id: property.id },
            update: {},
            create: property,
        });
    }


    // Seed hosts
    for (const host of hosts) {
        await prisma.host.upsert({
            where: { id: host.id },
            update: {},
            create: host,
        });
} 

    // Seed amenities
    for (const amenity of amenities) {
        await prisma.amenity.upsert({
            where: { id: amenity.id },
            update: {},
            create: amenity,
        });
    }       
}}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

