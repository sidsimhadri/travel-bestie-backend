const axios = require('axios');

const YELP_API_URL = 'https://api.yelp.com/v3/businesses/search';
const API_KEY = 'FAjpUWojGkRPEbKAMkVQyJrB1jsIVvOIvOrl_y7omRtdbAcJEzUOiUV2YU-ldP650_NrkK8K8bSIDY5jklMuj26kOgHRMTGY80hcLnKbNLEPzXWJ4QxCgijfksBBZXYx'; // Replace with your API key

const getYelpBusinesses = async (term, location) => {
  try {
    const response = await axios.get(YELP_API_URL, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      },
      params: {
        term,
        location
      }
    });
    return response.data.businesses;
  } catch (error) {
    console.error('Error fetching data from Yelp', error);
    throw error;
  }
};

// Example usage:
getYelpBusinesses('coffee', 'san francisco').then(businesses => {
  console.log(businesses);
});
