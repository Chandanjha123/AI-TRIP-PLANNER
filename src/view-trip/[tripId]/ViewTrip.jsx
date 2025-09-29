import { db } from '@/service/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import DailyPlacesToVisit from './components/DailyPlacesToVisit';

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  // Fetch trip data from Firebase
  const GetTripData = async () => {
    try {
      const docRef = doc(db, 'AITrips', tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTrip(docSnap.data());
        setLoading(false);
        console.log('Trip data loaded:', docSnap.data());
      } else {
        toast.error('No trip found!');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching trip:', err);
      toast.error('Failed to fetch trip data');
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading trip details...</p>;
  }

  if (!trip) {
    return <p className="text-center mt-10 text-gray-500">Trip not available.</p>;
  }

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection trip={trip} />
      {/* Recommended Hotels */}
      <Hotels trip={trip} />
      {/* Daily Plan */}
      <DailyPlacesToVisit trip={trip} />
      {/* Footer */}
    </div>
  );
};

export default ViewTrip;
