export const SelectTravelesList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveler in exploration',
    icon: '🧍',
    people: '1'
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travelers in tandem',
    icon: '👫',
    people: '2 People'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adventurers',
    icon: '👨‍👩‍👧‍👦',
    people: '3-5 People'
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'Small group of friends traveling together',
    icon: '🧑‍🤝‍🧑',
    people: '5-10 People'
  },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💴',
    },
    {
        id:2,
        title:'Average',
        desc:'Enjoy the trip without breaking the bank',
        icon:'💵',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Live like a king for your vacation',
        icon:'💶',

    }
]


export const AI_PROMPTS = `
You are a travel planner AI. Always respond ONLY with a valid JSON object (no extra text, no markdown).
The JSON MUST follow exactly this schema:

{
  "travelPlan": {
    "location": "string",
    "totalDays": number,
    "numberOfPeople": number,
    "budget": "string",
    "hotels": [
      {
        "hotelName": "string",
        "hotelDescription": "string",
        "hotelAddress": "string",
        "hotelRating": number,
        "hotelPriceRange": "string",
        "hotelAmenities": ["string"],
        "hotelImagesURLs": ["string"]
      }
    ],
    "itinerary": [
      {
        "day": number,
        "date": "string",
        "bestTimeToVisit": "string",
        "plan": [
          {
            "placeName": "string",
            "placeDetails": "string",
            "placeImageURL": "string",
            "geoCoordinates": "string",
            "ticketPricing": "string",
            "timeToSpend": "string"
          }
        ]
      }
    ]
  }
}

Important: Generate **3-5 hotels** in the "hotels" array. Each hotel must be unique with realistic hotelName, hotelAddress, hotelRating, hotelPriceRange, hotelDescription, and hotelImagesURLs.

Now generate the travel plan for:
Location: {location}
Days: {totalDays}
Travellers: {traveller}
Budget: {budget}

Remember: output ONLY the JSON object in the format above.
`
