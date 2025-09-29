import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { AI_PROMPTS, SelectBudgetOptions, SelectTravelesList } from "@/constants/Options";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { askGemini } from "@/service/AIModel";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useGoogleMapsScript from "@/service/useGoogleMapsScript"; // <-- import script hook

const CreateTrip = () => {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loaded = useGoogleMapsScript(); // <-- ensure Google Maps SDK is loaded

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Google Login
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.error(error),
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: { Authorization: `Bearer ${tokenInfo.access_token}` },
        }
      );
      localStorage.setItem("user", JSON.stringify(resp.data));
      setOpenDialog(false);
      onCreateToTrip(); // Auto-create trip after login
    } catch (err) {
      console.error("Failed to get user profile:", err);
      toast("Failed to sign in. Try again.");
    }
  };

  const onCreateToTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return setOpenDialog(true);
    if (!formData.location || !formData.days || !formData.budget || !formData.traveller) {
      return toast("Please fill all the details");
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPTS
      .replace("{location}", formData.location.label)
      .replace("{totalDays}", formData.days)
      .replace("{traveller}", formData.traveller)
      .replace("{budget}", formData.budget);

    try {
      const tripPlanRaw = await askGemini(FINAL_PROMPT);
      let tripPlan;
      if (typeof tripPlanRaw === "string") {
        tripPlan = JSON.parse(tripPlanRaw);
      } else {
        tripPlan = tripPlanRaw;
      }

      await SaveAiTrip(tripPlan);
      toast("Trip saved successfully!");
    } catch (err) {
      console.error("❌ Error from Gemini:", err);
      toast("Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) return toast("User not logged in properly");

    try {
      const docId = Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: TripData,
        userEmail: user.email,
        id: docId,
        createdAt: new Date().toISOString(),
      });
      navigate("/view-trip/" + docId);
    } catch (err) {
      console.error("Firestore write error:", err);
      toast("Failed to save trip to database");
    }
  };

  // Show loading until Google Maps SDK is loaded
  if (!loaded) return <p className="text-center mt-10 text-gray-500">Loading Maps...</p>;

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Provide some basic information and we'll create a fully planned trip for you.
      </p>

      {/* Destination */}
      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">Where is your Destination</h2>
        <GooglePlacesAutocomplete
          // removed apiKey, rely on useGoogleMapsScript instead
          selectProps={{
            value: place,
            onChange: (v) => {
              setPlace(v);
              handleInputChange("location", v);
            },
          }}
        />
      </div>

      {/* Days */}
      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">Number of Days</h2>
        <Input
          placeholder="Enter number of days (e.g., 3)"
          type="number"
          onChange={(e) => handleInputChange("days", e.target.value)}
        />
      </div>

      {/* Budget */}
      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">Budget</h2>
        <div className="grid grid-cols-2 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                formData.budget === item.title ? "shadow-lg border-black" : ""
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Travellers */}
      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">Who are you travelling with?</h2>
        <div className="grid grid-cols-2 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveller", item.people)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                formData.traveller === item.people ? "shadow-lg border-black" : ""
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Create Trip Button */}
      <div className="my-10 flex justify-end">
        <Button disabled={loading} onClick={onCreateToTrip}>
          {loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : "Create Trip"}
        </Button>
      </div>

      {/* Google Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <img src="/logonew.svg" alt="Logo" className="w-[8rem]" />
            </DialogTitle>
            <DialogDescription>
              <h2 className="font-bold text-lg text-gray-500 mt-7">Sign In with Google</h2>
              <p>You must be logged in to create a trip.</p>
              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center shadow-sm">
                <FcGoogle className="h-9 w-9" /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
