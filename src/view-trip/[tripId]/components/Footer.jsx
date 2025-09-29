import React from 'react'

const Footer = ({trip}) => {
  return (

        <footer className="w-full bg-gradient-to-b from-[#326e79] to-[#0184ff] text-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center ">
                <div className="flex items-center space-x-3 mb-6">
                    <img alt="" className="h-11"
                        src="/logonew.svg" />
                </div>
                <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
                   Every journey is more than just a checklist of places—it’s a story waiting to be lived. As you step into this adventure, embrace the moments, the people, and the little surprises along the way. This itinerary is your guide, but the real magic lies in the memories you create. Travel safe, travel light, and let every destination leave you with a story worth sharing.

                </p>
            </div>
            <div className="border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                    <a href="https://prebuiltui.com">YourOwnWay</a> ©2025. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer
