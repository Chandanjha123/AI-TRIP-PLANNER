export const getPlacePhotoUrl = (placeName, maxWidth = 400) => {
  return new Promise((resolve) => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error("Google Maps Places library not loaded yet");
      resolve(null);
      return;
    }

    const service = new window.google.maps.places.PlacesService(document.createElement("div"));

    const request = {
      query: placeName,
      fields: ["photos"]
    };

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]?.photos?.length) {
        const url = results[0].photos[0].getUrl({ maxWidth });
        resolve(url);
      } else {
        resolve(null);
      }
    });
  });
};
