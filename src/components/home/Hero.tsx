'use client';

import React, { useState } from 'react';
import { Percent } from 'lucide-react';
import Container from '@/components/layout/Container';
import ImpactContent from './Impact';
import ThailandSvgMap from './ThailandSvgMap';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Hero = () => {
    const { ref, isVisible } = useScrollReveal(0.05);
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [isMapHovered, setIsMapHovered] = useState(false);

    return (
        <section ref={ref} className="relative w-full bg-black pt-32 pb-16">
            <Container className="flex flex-col md:flex-row items-start gap-16 md:gap-24">
                <div className={`relative w-full md:w-[35%] flex flex-col justify-start items-start md:sticky md:top-32 reveal-on-scroll scale-in ${isVisible ? 'is-visible' : ''}`}>
                    <div 
                        onMouseEnter={() => setIsMapHovered(true)}
                        onMouseLeave={() => setIsMapHovered(false)}
                        className="relative w-full aspect-[382/700] rounded-[40px] bg-[#1A1A1A] shadow-2xl"
                    >
                        <ThailandSvgMap 
                            activeStep={2}
                            activeProvince={selectedProvince}
                            onProvinceSelect={(name: string) => setSelectedProvince(name)}
                        />
                    </div>
                    
                    {/* Floating Data Badge */}
                    <div className={`absolute -bottom-6 -right-6 md:-right-12 bg-white rounded-3xl p-6 shadow-2xl border border-black/5 animate-bounce-slow hidden md:block transition-all duration-500 ${isMapHovered || selectedProvince ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90 pointer-events-none'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                                <Percent className="text-white w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-2xl font-black text-black leading-none">3.7%</div>
                                <div className="text-[10px] font-bold text-black/30 uppercase tracking-widest mt-1">Impacted</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Content */}
                <div className="w-full md:w-[65%] flex flex-col items-start gap-12 mt-10 md:mt-0">
                    <div className="flex flex-col items-start gap-4">
                        <span className={`eyebrow reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''}`}>ETERNAL IMPACT IN THAILAND</span>
                        <h1 className={`heading-1 reveal-on-scroll fade-up delay-100 ${isVisible ? 'is-visible' : ''}`}>
                            Adventurer Foundation
                        </h1>
                        <div className="flex flex-col gap-5">
                            <p className={`paragraph reveal-on-scroll fade-up delay-200 ${isVisible ? 'is-visible' : ''}`}>
                                Thailand is home to over 84,000 villages, but 94.7% of them had no Gospel presence. Because of your
                                giving, that is changing — faster than we expected. Entire districts are being reached, new believers are 
                                being baptized, and the movement is accelerating.
                            </p>
                            <p className={`paragraph reveal-on-scroll fade-up delay-300 ${isVisible ? 'is-visible' : ''}`}>
                                In partnership with eStar and the Association of Free Churches in Thailand (AFT), your generosity through
                                the Adventurer Foundation is helping fulfill a God-sized vision:
                            </p>
                            <blockquote className={`quote-box reveal-on-scroll fade-up delay-400 ${isVisible ? 'is-visible' : ''}`}>
                                A church in every village. A disciple in every home.
                            </blockquote>
                        </div>
                    </div>

                    <div className={`w-full pt-8 border-t border-white/5 reveal-on-scroll fade-up delay-500 ${isVisible ? 'is-visible' : ''}`}>
                        <ImpactContent />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Hero;
