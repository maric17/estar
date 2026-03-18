'use client';

import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Church, Megaphone, UserRound, AlertCircle } from 'lucide-react';
import Container from '@/components/layout/Container';
import { NAKHON_SAWAN_DUMMY_DATA, DistrictStats } from '@/data/dummyProvinceData';
import nakhonSawanImage from '@/assets/images/NakhonSawan.png';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

// Set your token in .env.local as NEXT_PUBLIC_MAPBOX_TOKEN
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const ImpactTracker = () => {
    const { ref, isVisible } = useScrollReveal();
    const [activeStep, setActiveStep] = useState(2); // Default to "Today"
    const [selectedDistrict, setSelectedDistrict] = useState<DistrictStats | null>(null);
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const markers = useRef<mapboxgl.Marker[]>([]);

    const currentState = NAKHON_SAWAN_DUMMY_DATA[activeStep];

    // Initialize Map and handle Markers
    useEffect(() => {
        if (!mapContainer.current || !mapboxgl.accessToken) return;
        
        if (!map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/dark-v11', // Premium dark style
                center: [100.1, 15.7], // Center of Nakhon Sawan
                zoom: 8.5,
                pitch: 45, // Add a bit of tilt for depth
                attributionControl: false
            });
        }

        // Clean up old markers
        markers.current.forEach(m => m.remove());
        markers.current = [];

        // Add Markers for districts
        currentState.districts.forEach((district) => {
            const el = document.createElement('div');
            el.className = `w-4 h-4 rounded-full border-2 border-white bg-black cursor-pointer transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.5)] 
                ${selectedDistrict?.name === district.name ? 'scale-150 bg-white ring-4 ring-white/20' : 'hover:scale-125 hover:bg-white'}`;
            
            const marker = new mapboxgl.Marker(el)
                .setLngLat(district.coordinates)
                .addTo(map.current!);

            el.addEventListener('click', () => {
                setSelectedDistrict(district);
                map.current?.flyTo({ center: district.coordinates, zoom: 10, duration: 1500 });
            });

            markers.current.push(marker);
        });

        // Effect for flying back when no district selected
        if (!selectedDistrict) {
            map.current.flyTo({ center: [100.1, 15.7], zoom: 8.5, pitch: 45, duration: 1500 });
        }

    }, [currentState.districts, selectedDistrict]);

    return (
        <section ref={ref} className="bg-black py-24 border-t border-white/5 overflow-hidden">
            <Container>
                {!mapboxgl.accessToken && (
                    <div className={`mb-12 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 text-white/60 reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''}`}>
                        <AlertCircle className="flex-shrink-0" />
                        <p className="text-sm">
                            <span className="font-bold text-white block">Mapbox Token Missing!</span>
                            Please add <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> to your <code>.env.local</code> to enable the interactive map.
                        </p>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    {/* Left: Timeline */}
                    <div className="w-full lg:w-4/12">
                        <div className={`mb-12 reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''}`}>
                            <h2 className="heading-1 mb-6 text-white tracking-tighter">Nakhon Sawan</h2>
                            <p className="paragraph max-w-2xl text-white/50 leading-relaxed italic">
                                &quot;{currentState.description}&quot;
                            </p>
                        </div>

                        <div className="relative pl-8 border-l border-white/10 space-y-12">
                            {Object.entries(NAKHON_SAWAN_DUMMY_DATA).map(([key, step], idx) => (
                                <div 
                                    key={key} 
                                    className={`relative transition-all duration-500 cursor-pointer reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''} ${idx === activeStep ? 'opacity-100' : 'opacity-40 hover:opacity-60'}`}
                                    style={{ transitionDelay: `${(idx + 1) * 100}ms` }}
                                    onClick={() => {
                                        setActiveStep(idx);
                                        setSelectedDistrict(null);
                                    }}
                                >
                                    <div className={`absolute -left-[37px] top-1 w-[11px] h-[11px] rounded-full border-2 bg-black z-10 transition-all duration-500
                                        ${idx === activeStep ? 'border-white scale-150 shadow-[0_0_20px_rgba(255,255,255,0.8)]' : 'border-white/30'}`} 
                                    />
                                    
                                    <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{step.label}</h3>
                                    <p className="text-xs font-semibold text-white/30 mb-4 uppercase tracking-widest">{step.date}</p>
                                    
                                    {idx === activeStep && (
                                        <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                                            <p className="text-sm text-white/70 leading-relaxed mb-4">
                                                Visualizing the movement growth through {step.label}.
                                            </p>
                                            <div className="flex gap-4">
                                                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] text-white/60 font-bold uppercase tracking-wider">
                                                    {step.churches} Churches
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Interactive Map Control */}
                    <div className="w-full lg:w-8/12 flex flex-col justify-center gap-12">
                        <div className={`relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl reveal-on-scroll scale-in delay-300 ${isVisible ? 'is-visible' : ''}`}>
                            {mapboxgl.accessToken ? (
                                <>
                                    <div ref={mapContainer} className="absolute inset-0 grayscale contrast-125 brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000" />
                                    {/* ... rest of the map bits ... */}
                                </>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                                    <Image src={nakhonSawanImage} alt="Fallback" fill className="object-contain opacity-40 grayscale" />
                                </div>
                            )}
                        </div>

                        {/* Summary Stats Overview */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {[
                                { icon: Church, label: "CHURCHES PLANTED", value: currentState.churches },
                                { icon: Megaphone, label: "JOINED MEMBERS", value: currentState.joined },
                                { icon: UserRound, label: "BAPTIZED MEMBERS", value: currentState.baptized }
                            ].map((stat, i) => (
                                <div key={i} className={`flex flex-col items-center text-center group cursor-default reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${500 + (i * 100)}ms` }}>
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                                        <stat.icon className="w-7 h-7 text-black transition-transform duration-500 group-hover:rotate-12" />
                                    </div>
                                    <span className="text-4xl font-black text-white mb-1 tracking-tighter">
                                        {stat.value}
                                    </span>
                                    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.25em]">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ImpactTracker;
