import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

type NominatimGeocodingResponse = {
  features: { geometry: { coordinates: [number, number] } }[];
};

form?.addEventListener('submit', async (event: Event) => {
  event.preventDefault();

  const enteredAddress = addressInput.value;

  try {
    const respone = await axios.get<NominatimGeocodingResponse>(
      `https://nominatim.openstreetmap.org/search?q=${encodeURI(
        enteredAddress
      )}&format=geojson`
    );
  } catch (error) {
    console.log(error);
  }
});
