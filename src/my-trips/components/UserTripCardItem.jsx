import React, { useEffect, useState } from 'react';
import useGoogleMapsScript from '@/service/useGoogleMapsScript';
import { getPlacePhotoUrl } from '@/service/GooglePlaces';
import { Link } from 'react-router-dom';

const UserTripCardItem = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const loaded = useGoogleMapsScript();

  useEffect(() => {
    const fetchPhoto = async () => {
      if (loaded && trip?.userSelection?.location?.label) {
        const url = await getPlacePhotoUrl(trip.userSelection.location.label, 500);
        if (url) setPhotoUrl(url);
      }
    };
    fetchPhoto();
  }, [loaded, trip]);

  return (
    <Link to={'/view-trip'+"/"+trip.id}>
    <div className='cursor-pointer hover:scale-105 transition-all'>
      <img src={photoUrl} alt="" className="object-cover rounded-xl"/>
      <div>
        <h2 className='font-bold text-lg'>
          {trip?.userSelection?.location?.label}
        </h2>
        <h2>{trip?.userSelection?.days} Days trip with {trip?.userSelection?.budget} Budget</h2>
      </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem;
