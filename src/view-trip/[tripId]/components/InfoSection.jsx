import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { FaShareNodes } from "react-icons/fa6";
import { getPlacePhotoUrl } from '../../../service/GooglePlaces';
import useGoogleMapsScript from '../../../service/useGoogleMapsScript';

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState('/tripimage.png');
  const loaded = useGoogleMapsScript();

  useEffect(() => {
    const fetchPhoto = async () => {
      if (loaded && trip?.userSelection?.location?.label) {
        const url = await getPlacePhotoUrl(trip.userSelection.location.label, 800);
        if (url) setPhotoUrl(url);
      }
    };
    fetchPhoto();
  }, [loaded, trip]);

  return (
    <div>
      {/* Cover Image */}
      <img
        src={photoUrl}
        alt="Trip Cover"
        className="h-[340px] w-full object-cover rounded-xl"
      />

      {/* Trip Info */}
      <div className="flex justify-between items-center mt-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label || 'Unknown Destination'}
          </h2>

          <div className="flex gap-3 flex-wrap">
            <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {trip?.totalDays || trip?.userSelection?.days || 0} Days
            </span>
            <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip?.userSelection?.budget || 'Unknown'} Budget
            </span>
            <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🧑‍🤝‍🧑 Travellers: {trip?.numberOfPeople || trip?.userSelection?.traveller || 1}
            </span>
          </div>
        </div>

        <Button>
          <FaShareNodes />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
