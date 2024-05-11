import { useState, useEffect } from 'react'
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

import Places from './Places.jsx';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        let places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((pos) => {
          const sortedPlaces = sortPlacesByDistance(
              places, 
              pos.coords.latitude, 
              pos.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      }
      catch (error) {
        setIsFetching(false);
        setIsError({
          message : error.message || 'Could not fetch places. Try again later.'
        });
      }

      //    fetch('http://localhost:3000/places')
      //     .then(resp => {
      //       return resp.json()
      //     })
      //     .then(data => {
      //       setAvailablePlaces(data.places);
      //     })
      //     .catch(e => {
      //       console.log('Error', e);
      //     });

    }
    fetchPlaces();
  }, []);

  if (isError) {
    return (
      <Error
        title="Error occured"
        message={isError.message}
      />
    )
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
