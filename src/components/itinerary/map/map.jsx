import React from "react";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import MapSearch from "../search/MapSearch";

export default function map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZHVkbGV5c3BlbmNlIiwiYSI6ImNtMTgzMGd0NjB5a2MyanF4ajhxemJueWYifQ.MBrDjlb4vJb-YTDU6ZWmRQ";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <div>
      <MapSearch />
      <div
        ref={mapContainerRef}
        className="h-screen w-screen z-0"
        id="map-container"
      />
    </div>
  );
}
