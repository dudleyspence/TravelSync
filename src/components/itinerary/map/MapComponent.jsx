import React from "react";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

export default function MapComponent({ selectedLocation, nearbyPlaces }) {
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

    if (searchMarkerRef.current) {
      searchMarkerRef.current.remove();
    }

    mapRef.current.flyTo({
      center: [geometry.lng, geometry.lat],
      essential: true,
      zoom: 14,
    });

    searchMarkerRef.current = new mapboxgl.Marker({ color: "green" })
      .setLngLat([geometry.lng, geometry.lat])
      .addTo(mapRef.current);
  }, [selectedLocation]);

  useEffect(() => {
    if (!nearbyPlaces || nearbyPlaces.length === 0) return;

    if (!mapRef.current) return;

    clearNearbyMarkers();

    nearbyPlaces.forEach((place) => {
      const pinkMarker = new mapboxgl.Marker({ color: "pink" })
        .setLngLat([place.Eg.location.lng, place.Eg.location.lat])
        .addTo(mapRef.current);

      // Store each pink marker in markersRef
      nearbyMarkersRef.current.push(pinkMarker);
    });
  }, [nearbyPlaces]);

  return (
    <div
      ref={mapContainerRef}
      className="h-screen w-screen"
      id="map-container"
    />
  );
}
