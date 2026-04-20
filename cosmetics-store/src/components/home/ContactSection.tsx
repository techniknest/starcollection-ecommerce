"use client";

import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ExternalLink,
  ArrowUpRight,
  Clock
} from "lucide-react";
import { useSettings } from "@/features/settings/hooks/use-settings";

export default function ContactSection() {
  const { settings } = useSettings();
  const whatsappLink = `https://wa.me/${settings.whatsappNumber}`;
  const googleMapsUrl = "https://maps.app.goo.gl/VQ9FS3hu27uohkEfA?g_st=awb";

  const contactMethods = [
    {
      label: "Call or SMS",
      value: settings.whatsappNumber,
      icon: Phone,
      action: `tel:${settings.whatsappNumber}`,
      color: "bg-blue-500"
    },
    {
      label: "WhatsApp Support",
      value: `+${settings.whatsappNumber}`,
      icon: MessageCircle,
      action: whatsappLink,
      color: "bg-green-500"
    },
    {
      label: "Official Email",
      value: settings.supportEmail,
      icon: Mail,
      action: `mailto:${settings.supportEmail}`,
      color: "bg-gold"
    }
  ];

  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Side: Text and Buttons */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col space-y-12 shrink-0">
          <header className="space-y-4 md:space-y-6">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[10px] font-bold text-gold uppercase tracking-widest shadow-inner">
               Connect
             </div>
             <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground tracking-tight uppercase leading-[1.1] heading-luxury">
               Visit Our <br />
               <span className="text-gold italic font-light heading-luxury">Boutique</span>
             </h2>
             <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-md">
               Experience the allure of Stars Collection in person. Visit us at Abbottabad's heart for a curated luxury experience.
             </p>
          </header>

          <div className="space-y-6">
            {contactMethods.map((method, idx) => (
              <a 
                key={method.label}
                href={method.action}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 glass-panel border border-white/5 rounded-[2rem] hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 hover:-translate-x-2"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="flex items-center gap-6">
                   <div className={`w-12 h-12 rounded-2xl ${method.color}/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                      <method.icon className="w-5 h-5" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-gold opacity-80">{method.label}</p>
                      <p className="text-foreground font-bold tracking-wide">{method.value}</p>
                   </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-gold transition-colors duration-500" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Map and Physical location */}
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col space-y-8 h-full">
           <div className="p-8 glass-panel border border-white/5 rounded-[3rem] space-y-8 flex flex-col md:flex-row gap-8 items-start lg:items-center hover:border-gold/20 transition-all duration-500 shrink-0">
              <div className="w-16 h-16 rounded-3xl bg-surface-light shadow-inner flex items-center justify-center text-gold shrink-0">
                 <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-4 flex-1">
                 <h3 className="text-xl font-black text-foreground tracking-widest uppercase heading-luxury">Physical Address</h3>
                 <p className="text-gray-400 font-light leading-relaxed text-sm uppercase">
                   {settings.address}
                 </p>
                 <a 
                   href={googleMapsUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 text-gold font-bold text-[10px] uppercase tracking-widest hover:text-white transition-colors pt-2"
                 >
                   Open in Google Maps <ExternalLink className="w-4 h-4" />
                 </a>
              </div>
              <div className="hidden md:block w-px h-24 bg-white/10" />
              <div className="space-y-4">
                 <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-4 h-4 text-gold" />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Opening Hours</span>
                 </div>
                 <p className="text-foreground font-bold text-sm">Mon - Sat</p>
                 <p className="text-gold text-xs font-medium tracking-wider">10:00 AM - 08:00 PM</p>
              </div>
           </div>

           {/* Embed-like Map Placeholder Area */}
           <div className="w-full rounded-[3rem] glass-panel border border-white/5 relative overflow-hidden group flex-1 min-h-[400px]">
              <div className="absolute inset-0 bg-dark/20 z-10 pointer-events-none" />
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13233.0!2d73.2!3d34.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38de31115b81ae51%3A0xa64b38d38865cffa!2sTanchi%20Chowk%2C%20Abbottabad%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                className="absolute inset-0 w-full h-full border-0 opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
           </div>
        </div>
      </div>
      {/* Decorative effect */}
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-gold/5 blur-[150px] pointer-events-none rounded-full animate-fluid-float" />
    </section>
  );
}
