import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { restaurantQuery } from "../../apollo-config/graphql";
import ResturantsGrid from "./ResturantsGrid";
import LoadingSkeleton from './LoadingSkeleton'

interface NearbyResturantsProps {
  coordinates: { lat: number; lng: number };
  fetchRestaurants: () => void; // Receive fetch function
  fetchTriggered: boolean; // Receive fetch trigger state
}

const NearbyResturants = React.memo(
  ({ coordinates, fetchRestaurants, fetchTriggered }: NearbyResturantsProps) => {
    const [restaurants, setRestaurants] = useState([]);

    const [loading, setLoading] = useState(false);
    const [getRestaurants, { data, error, loading: queryLoading }] = useLazyQuery(restaurantQuery, {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        setRestaurants(data?.nearByRestaurants?.restaurants || []);
        setLoading(false); // Set loading to false once data is received
      },
      onError: () => {
        setLoading(false); // Set loading to false in case of an error
      },
    });

    // Memoizing the fetchRestaurants function to avoid unnecessary re-creations
    const triggerFetch = useCallback(() => {
      if (fetchTriggered) {
        getRestaurants({
          variables: {
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          },
        });
      }
    }, [fetchTriggered, coordinates.lat, coordinates.lng, getRestaurants]);

    // Trigger the API fetch when fetchTriggered changes
    useEffect(() => {
      triggerFetch();
    }, [triggerFetch]);

    // Memoizing restaurants data to avoid unnecessary re-renders of ResturantsGrid
    const memoizedRestaurants = useMemo(() => restaurants, [restaurants]);

    if (error) {
      console.error("Error fetching restaurants:", error);
      return <p className="text-red-500">Error: {error.message}</p>;
    }

    return (
      <div>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="mt-4">
            {/* Show restaurant grid after fetchTriggered is true */}
            {fetchTriggered && <ResturantsGrid restaurants={memoizedRestaurants} />}
          </div>
        )}
      </div>
    );
  }
);

export default NearbyResturants;
