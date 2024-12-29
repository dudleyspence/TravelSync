import React from "react";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import SelectedPinSummary from "./SelectedPinSummary";
import { fetchPlaceDetails } from "../../../axios";
import { useMapContext } from "../../../context/MapContext";

export default function MapComponent() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const searchMarkerRef = useRef(null);
  const nearbyMarkersRef = useRef([]);
  const activeMarkerRef = useRef(null);

  const { searchedLocation, nearbyPlaces, setSelectedMarker, selectedMarker } =
    useMapContext();

  // Util function to remove nearby places markers
  function clearNearbyMarkers() {
    nearbyMarkersRef.current.forEach((marker) => marker.remove());
    nearbyMarkersRef.current = [];
  }

  // Util function to remove all markers
  function clearAllMarkers() {
    searchMarkerRef.current.remove();
    searchMarkerRef.current = null;
    clearNearbyMarkers();
  }

  function setMarkerColor(marker, color) {
    const el = marker.getElement();
    const svg = el.querySelector("path");
    if (svg) {
      svg.style.fill = color;
    }
  }

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
    if (!searchedLocation) return;

    if (!mapRef.current) return;

    if (searchMarkerRef.current) {
      clearAllMarkers();
    }
    const lattitude = searchedLocation.location.lat();
    const longitude = searchedLocation.location.lng();

    mapRef.current.flyTo({
      center: [longitude, lattitude],
      essential: true,
      zoom: 14,
      speed: 2,
      curve: 1.5,
    });

    const searchMarker = new mapboxgl.Marker({ color: "green" })
      .setLngLat([longitude, lattitude])
      .addTo(mapRef.current);

    if (activeMarkerRef.current) {
      setMarkerColor(activeMarkerRef.current, "#e91e63");
    }

    activeMarkerRef.current = searchMarker;

    searchMarker.getElement().style.cursor = "pointer";
    searchMarker.getElement().addEventListener("click", () => {
      setSelectedMarker(searchedLocation);
      setMarkerColor(activeMarkerRef.current, "#e91e63");
      setMarkerColor(searchMarker, "green");
      activeMarkerRef.current = searchMarker;
    });

    searchMarkerRef.current = searchMarker;
  }, [searchedLocation]);

  useEffect(() => {
    if (!mapRef.current) return;

    clearNearbyMarkers();

    nearbyPlaces.forEach((place) => {
      const nearbyMarker = new mapboxgl.Marker({
        color: "#e91e63",
      })
        .setLngLat([place.location.lng, place.location.lat])
        .addTo(mapRef.current);

      nearbyMarker.getElement().style.cursor = "pointer";

      nearbyMarker.getElement().addEventListener("click", async () => {
        // set old marker to be pink again
        if (activeMarkerRef.current) {
          setMarkerColor(activeMarkerRef.current, "#e91e63");
        }
        // set this pink marker to green
        setMarkerColor(nearbyMarker, "green");

        // make this green marker the active marker
        activeMarkerRef.current = nearbyMarker;
        const detailedNearbyPlace = await fetchPlaceDetails(place.id);
        setSelectedMarker(detailedNearbyPlace);
      });

      // Store each nearby marker in markersRef
      nearbyMarkersRef.current.push(nearbyMarker);
    });
  }, [nearbyPlaces]);

  useEffect(() => {
    if (!selectedMarker || !mapRef.current) return;

    const { location } = selectedMarker;

    mapRef.current.flyTo({
      center: [location.lng(), location.lat()],
      zoom: 17,
      speed: 1.2,
    });
  }, [selectedMarker]);

  return (
    <div>
      <div
        ref={mapContainerRef}
        className="h-screen w-screen"
        id="map-container"
      />
      {selectedMarker && <SelectedPinSummary selectedMarker={selectedMarker} />}
    </div>
  );
}
