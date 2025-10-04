import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useGoogleMapsScript from '../../../service/useGoogleMapsScript';
import { getPlacePhotoUrl } from '@/service/GooglePlaces';
import Skeleton from '@/my-trips/components/Skeleton';

const Hotels = ({ trip }) => {
  const loaded = useGoogleMapsScript();
  const [hotelImages, setHotelImages] = useState({}); // { hotelName: imageUrl }

  useEffect(() => {
    const fetchHotelImages = async () => {
      if (loaded && trip?.tripData?.travelPlan?.hotels?.length) {
        const images = {};
        for (const hotel of trip.tripData.travelPlan.hotels) {
          const url = await getPlacePhotoUrl(
            hotel.hotelName + ' ' + hotel.hotelAddress,
            400
          );
          images[hotel.hotelName] = url;
        }
        setHotelImages(images);
      }
    };

    fetchHotelImages();
  }, [loaded, trip]);

  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

      <div className='p-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip?.tripData?.travelPlan?.hotels?.map((hotel, index) => (
          <Link
            key={index}
            to={
              'https://www.google.com/maps/search/?api=1&query=' +
              hotel.hotelName +
              ',' +
              hotel.hotelAddress
            }
            target='_blank'
          >
            <div className='hover:scale-105 transition-all cursor-pointer'>
              {hotelImages[hotel.hotelName] ? (
                <img
                  src={hotelImages[hotel.hotelName]}
                  alt={hotel.hotelName}
                  className='rounded-xl h-40 w-full object-cover'
                />
              ) : (
                <Skeleton value={240} />
              )}
              <div className='my-2 flex flex-col gap-3'>
                <h2 className='font-medium'>{hotel.hotelName}</h2>
                <h2 className='text-xs text-gray-500'>
                  📍{hotel.hotelAddress}
                </h2>
                <h2 className='text-sm text-gray-500'>
                  💲{hotel?.hotelPriceRange}
                </h2>
                <h2 className='text-xs text-gray-500'>
                  ⭐{hotel?.hotelRating}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
