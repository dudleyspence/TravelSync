import React from "react";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import SelectedPinSummary from "./SelectedPinSummary";
import { fetchPlaceDetails } from "../../../axios";

export default function MapComponent({
  selectedLocation,
  nearbyPlaces,
  selectedMarker,
  setSelectedMarker,
}) {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const searchMarkerRef = useRef(null);
  const nearbyMarkersRef = useRef([]);

  // Util function to remove nearby places markers
  const clearNearbyMarkers = () => {
    nearbyMarkersRef.current.forEach((marker) => marker.remove());
    nearbyMarkersRef.current = [];
  };

  // Setup for the map
  useEffect(() => {
    if (mapRef.current) return;
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZHVkbGV5c3BlbmNlIiwiYSI6ImNtMTgzMGd0NjB5a2MyanF4ajhxemJueWYifQ.MBrDjlb4vJb-YTDU6ZWmRQ";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  // adds a marker when the location search is selected
  useEffect(() => {
    if (!selectedLocation) return;
    const geometry = {
      lat: selectedLocation.geometry.location.lat(),
      lng: selectedLocation.geometry.location.lng(),
    };

    if (!mapRef.current) return;

    console.log(searchMarkerRef);

    if (searchMarkerRef.current) {
      searchMarkerRef.current.remove();
      searchMarkerRef.current = null;
    }

    mapRef.current.flyTo({
      center: [geometry.lng, geometry.lat],
      essential: true,
      zoom: 14,
      speed: 2,
      curve: 1.5,
    });

    const marker = new mapboxgl.Marker({ color: "green" })
      .setLngLat([geometry.lng, geometry.lat])
      .addTo(mapRef.current);

    marker.getElement().style.cursor = "pointer";

    marker.getElement().addEventListener("click", async () => {
      console.log(selectedLocation);

      try {
        const detailedPlace = await fetchPlaceDetails(
          selectedLocation.place_id
        );
        setSelectedMarker(detailedPlace);
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    });

    searchMarkerRef.current = marker;
  }, [selectedLocation]);

  useEffect(() => {
    if (!mapRef.current) return;

    clearNearbyMarkers();

    if (!nearbyPlaces || nearbyPlaces.length === 0) return;

    nearbyPlaces.forEach(({ Eg }) => {
      const place = Eg;

      const pinkMarker = new mapboxgl.Marker({
        color: "#e91e63",
        hover: "curser-pointer",
      })
        .setLngLat([place.location.lng, place.location.lat])
        .addTo(mapRef.current);

      pinkMarker.getElement().style.cursor = "pointer";

      pinkMarker.getElement().addEventListener("click", async () => {
        try {
          const detailedPlace = await fetchPlaceDetails(place.id);

          setSelectedMarker(detailedPlace);
        } catch (error) {
          console.error("Error fetching place details:", error);
        }
      });

      // Store each pink marker in markersRef
      nearbyMarkersRef.current.push(pinkMarker);
    });
  }, [nearbyPlaces]);

  return (
    <div>
      <div
        ref={mapContainerRef}
        className="h-screen w-screen"
        id="map-container"
      />
      {selectedMarker && (
        <SelectedPinSummary
          title={selectedMarker?.title}
          description={selectedMarker?.description}
          address={selectedMarker?.address}
          rating={selectedMarker?.rating}
          website={selectedMarker?.website}
          image={selectedMarker?.photo}
          type={selectedMarker?.type}
          ratingsCount={selectedMarker?.ratingCount}
          googleMaps={selectedMarker?.googleMaps}
        />
      )}
    </div>
  );
}
