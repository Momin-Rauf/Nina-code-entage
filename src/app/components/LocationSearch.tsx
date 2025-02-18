'use client'
import { useState, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { TbCurrentLocation } from "react-icons/tb";
import NearbyResturants from "./NearbyResturants";
import { Dropdown } from 'primereact/dropdown';

const OPENCAGE_API_KEY = "ff949bcce08d459790ed43412e642ccc";

export default function LocationSearch() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null,
  });
  const [selectedAddress, setSelectedAddress] = useState(null); // State for selected address

  const [fetchTriggered, setFetchTriggered] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get user's current location and fetch address
  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
        );
        const { results } = response.data;
        if (results.length > 0) {
          setAddress(results[0].formatted);
          setCoordinates({ lat: latitude, lng: longitude });
          setSelectedAddress(results[0].formatted); // Set the fetched address
        }
      } catch (error) {
        console.error("Reverse geocoding error:", error);
      }
    });
  }, []);

  // Fetch restaurants based on coordinates
  const fetchRestaurants = useCallback(() => {
    setFetchTriggered(true);
  }, []);

  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="relative bg-black h-auto sm:h-[90px] flex flex-col justify-center items-center p-2 rounded-2xl shadow-lg w-full max-w-3xl">
        <div className="md:flex w-[100%] md:flex-row flex flex-col">
          {/* Address Input Field */}
          <div className="flex w-full mb-1 flex-row">
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-grow p-3 rounded-l-xl focus:outline-none text-black"
            />

            {/* Get Current Location Button */}
            <button
              onClick={getCurrentLocation}
              className="bg-white rounded-r-xl p-3 hover:bg-gray-200 text-black flex items-center justify-center"
            >
              <TbCurrentLocation className="text-green-500" />
            </button>
          </div>

          {/* Find Restaurants Button */}
          <button
            onClick={fetchRestaurants}
            className="bg-green-500 rounded-xl ml-2 hover:bg-green-600 text-white font-bold py-3 px-6"
            disabled={loading}
          >
            {loading ? "Searching..." : "Find Restaurants"}
          </button>
        </div>
      </div>

      {/* Show the Dropdown with the address if it's available */}
      {selectedAddress && (
        <div className="card flex  p-0 w-[80%] rounded-2xl h-[10vh] text-black bg-gray-300 justify-content-center w-full mt-4">
          <div className='w-[35%] text-black bg-[#94e469] text-2xl flex justify-center items-center rounded-l-2xl' >Delivering to</div>
          <Dropdown
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.value)}
            options={[selectedAddress]} // Show only the user's address in the dropdown
            placeholder="Select your address"
            className="w-[75%] p-2 rounded-r-2xl text-black flex justify-center items-center bg-gray-300 md:w-14rem"
          />
        </div>
      )}

      {/* Pass coordinates and fetchRestaurants to NearbyRestaurants */}
      {coordinates.lat && coordinates.lng && (
        <NearbyResturants coordinates={coordinates} fetchRestaurants={fetchRestaurants} fetchTriggered={fetchTriggered} />
      )}
    </div>
  );
}
