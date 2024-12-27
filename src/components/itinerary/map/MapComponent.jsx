import React from "react";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

export default function MapComponent({ selectedLocation }) {
  const mapRef = useRef();
  const mapContainerRef = useRef();

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
    mapRef.current.flyTo({
      center: [geometry.lng, geometry.lat],
      essential: true,
      zoom: 14,
    });
    new mapboxgl.Marker()
      .setLngLat([geometry.lng, geometry.lat])
      .addTo(mapRef.current);
  }, [selectedLocation]);

  return (
    <div
      ref={mapContainerRef}
      className="h-screen w-screen"
      id="map-container"
    />
  );
}
