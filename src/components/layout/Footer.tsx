import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone, Clock } from 'lucide-react';
import Container from './Container';
import logoImage from '@/assets/images/logo-branding.png';

const Footer = () => {
    return (
        <footer className="bg-black pt-24 pb-12 border-t border-white/5">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <Link href="/" className="inline-block">
                            <div className="flex items-center gap-3">
                                <Image src={logoImage} alt="eStar Global" width={40} height={40} className="invert" />
                                <span className="text-xl font-black text-white tracking-tighter uppercase">eSTAR <span className="text-white/40 block text-[8px] tracking-[0.4em] -mt-1 font-bold">GLOBAL</span></span>
                            </div>
                        </Link>
                        <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                            We help ministries strategically plant churches and reach unreached people 
                            through powerful tools, partnerships, and prayer.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all">
                                <Facebook size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all">
                                <Instagram size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all">
                                <Linkedin size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Spacer for 2nd column if needed according to design, but design has Quick Links in 3rd/4th spot on wide screens */}
                    <div className="hidden lg:block"></div>

                    {/* Quick Links */}
                    <div className="space-y-8">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Home', 'About Us', 'The Movement', 'Stories', 'Donate', 'Contact'].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-sm text-white/40 hover:text-white transition-colors">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Get in Touch */}
                    <div className="space-y-8">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">Get in Touch</h4>
                        <ul className="space-y-5">
                            <li className="flex gap-4 text-white/40">
                                <MapPin size={18} className="flex-shrink-0" />
                                <span className="text-sm leading-tight">123 Main Street,<br />New York, NY 10001</span>
                            </li>
                            <li className="flex gap-4 text-white/40 items-center">
                                <Mail size={18} className="flex-shrink-0" />
                                <span className="text-sm leading-tight">contact@mysite.com</span>
                            </li>
                            <li className="flex gap-4 text-white/40 items-center">
                                <Phone size={18} className="flex-shrink-0" />
                                <span className="text-sm leading-tight">+1 123-456-7890</span>
                            </li>
                            <li className="flex gap-4 text-white/40">
                                <Clock size={18} className="flex-shrink-0" />
                                <span className="text-sm leading-tight">Mon-Fri<br />9:00AM - 5:00PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-4">
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
                        &copy; {new Date().getFullYear()} All Rights Reserved.
                    </p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
