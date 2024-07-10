import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

type NominatimGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 'OK' | 'ZERO_RESULTS';
};

declare var google: any;

const GOOGLE_API_KEY = '';

form?.addEventListener('submit', async (event: Event) => {
  event.preventDefault();

  const enteredAddress = addressInput.value;

  try {
    const respone = await axios.get<NominatimGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    );

    const coordinantes = respone.data.results[0].geometry.location;

    const map = new google.maps.Map(document.getElementById('map'), {
      center: coordinantes,
      zoom: 16,
    });

    new google.maps.Marker({ position: coordinantes, map });

    if (respone.data.status !== 'OK')
      throw new Error('Could not fetch location!');
  } catch (error: any) {
    alert(error.message);
    console.log(error);
  }
});
