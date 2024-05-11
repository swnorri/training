export async function fetchAvailablePlaces() {
  const resp = await fetch('http://localhost:3000/places');
  const data = await resp.json();

  if (!resp.ok) {
    throw new Error('Failed to fetch places');
  }
  return data.places;
}

export async function fetchUserPlaces() {
  const resp = await fetch('http://localhost:3000/user-places');
  const data = await resp.json();

  if (!resp.ok) {
    throw new Error('Failed to fetch user-data places');
  }
  return data.places;
}

export async function updateUserPlaces(places) {
  const resp = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await resp.json();

  if (!resp.ok) {
    throw new Error('Failed to update data');
  }
  return data.message;
}

