import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPlacePhotoUrl } from '@/service/GooglePlaces';
import useGoogleMapsScript from '@/service/useGoogleMapsScript';

const PlaceCard = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState('/tripimage.png');
  const loaded = useGoogleMapsScript(); // wait for script

  useEffect(() => {
    let isMounted = true;

    const fetchPhoto = async () => {
      if (loaded && place?.placeName) {
        try {
          const url = await getPlacePhotoUrl(place.placeName, 400);
          if (url && isMounted) {
            setPhotoUrl(url);
          }
        } catch (error) {
          console.error("Error fetching place photo:", error);
        }
      }
    };

    fetchPhoto();

    return () => {
      isMounted = false;
    };
  }, [loaded, place?.placeName]);

  return (
    <Link
      to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName}
      target='_blank'
    >
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img
          src={photoUrl}
          alt={place.placeName || "Place image"}
          className='w-[150px] h-[150px] object-cover rounded-xl'
        />

        <div>
          <h2 className='font-bold text-lg'>{place?.placeName}</h2>
          <p className='text-sm text-gray-500'>{place?.placeDetails}</p>
          <h2 className='mt-2'>Time To Spend: 🕙 {place?.timeToSpend}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
