import { directus, School } from './directus';
import { readItems } from '@directus/sdk';

// Function to test fetching data from the 'schools' collection
async function testFetchSchools() {
  try {
    const schools = await directus.request(readItems('school', {
      fields: ['*'], // Fetch all fields
    //   limit: 2,      // Limit to 2 items for a quick test
    })) as School[];

    console.log('Fetched Schools:', schools);

    if (schools.length > 0) {
      console.log('Successfully fetched data from the schools collection!');
      schools.forEach(school => {
        console.log(`School: ${school.name}, Slug: ${school.slug}`);
      });
    } else {
      console.log('No schools found, but the API call was successful.');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching schools:', error.message);
    }
  }
}

// Run the test
testFetchSchools();