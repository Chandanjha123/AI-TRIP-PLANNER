import React from "react"
import PlaceCard from "./PlaceCard"

const DailyPlacesToVisit = ({ trip }) => {
  // Safely access itinerary
  const itinerary = trip?.tripData?.travelPlan?.itinerary || []

  if (!Array.isArray(itinerary) || itinerary.length === 0) {
    return <p className="text-gray-500">No itinerary available yet.</p>
  }

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>

      {itinerary.map((dayPlan, index) => (
        <div key={index} className="mt-5">
          <h2 className="font-medium text-lg">
            {dayPlan.date || `Day ${dayPlan.day}`}
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {Array.isArray(dayPlan.plan) ? (
              dayPlan.plan.map((place, idx) => (
                <div key={idx}>
                  <h2 className="font-medium text-sm text-orange-500">
                    {place?.bestTime || dayPlan?.bestTimeToVisit || "Anytime"}
                  </h2>
                  <PlaceCard place={place} />
                </div>
              ))
            ) : (
              <p className="text-gray-400">No places listed for this day.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DailyPlacesToVisit
