'use client';

import React from 'react';
import Image from 'next/image';
import { Church, Megaphone, UserRound } from 'lucide-react';
import Container from '@/components/layout/Container';
import nakhonSawanImage from '@/assets/images/NakhonSawan.png';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const ExponentialResults = () => {
    const { ref, isVisible } = useScrollReveal();
    const districts = [
        { name: "Lat Yao", churches: 142, members: "1,882", believers: "1,357", top: "45%", left: "5%" },
        { name: "Tak Fa", churches: 119, members: "1,633", believers: "1,074", top: "60%", left: "38%" },
        { name: "Khaisali", churches: 100, members: "1,408", believers: "860", top: "52%", left: "75%" }
    ];

    const totals = [
        { icon: Church, value: "361", label: "CHURCHES" },
        { icon: Megaphone, value: "4,923", label: "MEMBERS" },
        { icon: UserRound, value: "3,291", label: "BELIEVERS" }
    ];

    return (
        <section ref={ref} className="bg-black py-24 border-t border-white/5 overflow-hidden">
            <Container>
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                    {/* Left: Map Visualization */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative aspect-[4/3] w-full">
                            <div className={`absolute inset-0 opacity-40 grayscale reveal-on-scroll scale-in ${isVisible ? 'is-visible' : ''}`}>
                                <Image 
                                    src={nakhonSawanImage} 
                                    alt="Nakhon Sawan Map" 
                                    fill 
                                    className="object-contain"
                                />
                            </div>

                            {/* District Labels */}
                            {districts.map((district, idx) => (
                                <div 
                                    key={idx} 
                                    className={`absolute p-4 bg-white rounded-2xl shadow-2xl text-black min-w-[120px] transition-transform hover:scale-105 reveal-on-scroll scale-in ${isVisible ? 'is-visible' : ''}`}
                                    style={{ 
                                        top: district.top, 
                                        left: district.left,
                                        transitionDelay: `${200 + (idx * 150)}ms`
                                    }}
                                >
                                    <p className="text-[10px] font-black uppercase tracking-tighter opacity-40 mb-1">{district.name}</p>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Church size={12} className="opacity-40" />
                                            <span className="text-[13px] font-black">{district.churches}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Megaphone size={12} className="opacity-40" />
                                            <span className="text-[13px] font-black">{district.members}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <UserRound size={12} className="opacity-40" />
                                            <span className="text-[13px] font-black">{district.believers}</span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-white rotate-45" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Content & Stats */}
                    <div className="w-full lg:w-1/2">
                        <div className="max-w-xl">
                            <h2 className={`heading-1 mb-8 text-white leading-[1.1] reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''}`}>Exponential Results Beyond</h2>
                            <div className="space-y-6 mb-12">
                                <p className={`paragraph text-lg reveal-on-scroll fade-up delay-100 ${isVisible ? 'is-visible' : ''}`}>
                                    What was funded to spark the planting of 311 churches has ignited a movement 
                                    far bigger than the sum of its parts. As these new communities multiply, 
                                    mentor one another, and spread through natural relationships, the impact 
                                    has accelerated well beyond our projections.
                                </p>
                                <p className={`paragraph font-bold text-white italic reveal-on-scroll fade-up delay-200 ${isVisible ? 'is-visible' : ''}`}>
                                    Your investment didn&apos;t just plant churches—it planted a multiplying movement.
                                </p>
                            </div>

                            {/* Totals Grid */}
                            <div className="grid grid-cols-3 gap-8">
                                {totals.map((stat, i) => (
                                    <div 
                                        key={i} 
                                        className={`flex flex-col items-center reveal-on-scroll scale-in ${isVisible ? 'is-visible' : ''}`}
                                        style={{ transitionDelay: `${400 + (i * 100)}ms` }}
                                    >
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-black shadow-xl">
                                            <stat.icon size={28} />
                                        </div>
                                        <span className="text-2xl font-black text-white">{stat.value}</span>
                                        <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mt-1">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ExponentialResults;
