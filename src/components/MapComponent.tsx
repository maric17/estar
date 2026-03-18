'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Suggest environment variable: NEXT_PUBLIC_MAPBOX_TOKEN
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface MapComponentProps {
  initialCenter?: [number, number]; // [lng, lat]
  initialZoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  initialCenter = [120.9842, 14.5995], // Manila by default 
  initialZoom = 12 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom: initialZoom,
    });

    // Cleanup on unmount
    return () => {
      map.current?.remove();
    };
  }, [initialCenter, initialZoom]);

  return (
    <div className="flex flex-col w-full h-full">
      {!mapboxgl.accessToken && (
        <div className="p-4 mb-2 text-white bg-red-600 rounded">
          Mapbox Access Token is missing! Please set <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> in your <code>.env.local</code>.
        </div>
      )}
      <div 
        ref={mapContainer} 
        className="w-full h-[500px] border border-gray-300 rounded shadow-sm"
      />
    </div>
  );
};

export default MapComponent;
