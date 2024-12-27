import React from "react";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import MapNav from "../search/MapNav";

export default function map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const [selectedLocation, setSelectedLocation] = useState("");

  console.log(selectedLocation);

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
      <MapNav setSelectedLocation={setSelectedLocation} />
      <div
        ref={mapContainerRef}
        className="h-screen w-screen z-0"
        id="map-container"
      />
    </div>
  );
}
