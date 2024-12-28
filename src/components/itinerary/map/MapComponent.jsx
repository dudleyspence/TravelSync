import React from "react";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import SelectedPinSummary from "./SelectedPinSummary";
import { fetchPlaceDetails } from "../../../axios";

export default function MapComponent({ selectedLocation, nearbyPlaces }) {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const searchMarkerRef = useRef(null);
  const nearbyMarkersRef = useRef([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  function createPopupHTML(name, description = null) {
    return `
    <div>
      <h1>${name}</h1>
      <p>${description}</p>
    </div>`;
  }

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
      console.log(searchMarkerRef.current);
      searchMarkerRef.current.remove();
      console.log(searchMarkerRef.current);
      searchMarkerRef.current = null;
    }

    mapRef.current.flyTo({
      center: [geometry.lng, geometry.lat],
      essential: true,
      zoom: 14,
    });

    const marker = new mapboxgl.Marker({ color: "green" })
      .setLngLat([geometry.lng, geometry.lat])
      .addTo(mapRef.current);

    marker.getElement().addEventListener("click", async () => {
      console.log(selectedLocation);

      try {
        const detailedPlaceResponse = await fetchPlaceDetails(
          selectedLocation.place_id
        );

        const detailedPlace = {
          title: detailedPlaceResponse?.displayName,
          description: detailedPlaceResponse?.editorialSummary,
          address: detailedPlaceResponse?.formattedAddress,
          rating: detailedPlaceResponse?.rating,
          website: detailedPlaceResponse?.websiteURI,
          photos: detailedPlaceResponse?.photos?.[0]?.url,
        };

        console.log(detailedPlace);

        setSelectedMarker(detailedPlace);
        console.log(detailedPlace);
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    });

    searchMarkerRef.current = marker;
  }, [selectedLocation]);

  useEffect(() => {
    if (!nearbyPlaces || nearbyPlaces.length === 0) return;

    if (!mapRef.current) return;

    clearNearbyMarkers();

    nearbyPlaces.forEach(({ Eg }) => {
      const place = Eg;
      const pinkMarker = new mapboxgl.Marker({ color: "pink" })
        .setLngLat([place.location.lng, place.location.lat])
        .addTo(mapRef.current);

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
          image={selectedMarker?.photos}
        />
      )}
    </div>
  );
}
