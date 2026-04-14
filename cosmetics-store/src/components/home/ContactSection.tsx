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

export default function ContactSection() {
  const whatsappNumber = "+923149328645";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace("+", "")}`;
  const googleMapsUrl = "https://maps.app.goo.gl/VQ9FS3hu27uohkEfA?g_st=awb";

  const contactMethods = [
    {
      label: "Call or SMS",
      value: "03149328645",
      icon: Phone,
      action: "tel:03149328645",
      color: "bg-blue-500"
    },
    {
      label: "WhatsApp Support",
      value: "+92 314 9328645",
      icon: MessageCircle,
      action: whatsappLink,
      color: "bg-green-500"
    },
    {
      label: "Official Email",
      value: "orders.starscollection@gmail.com",
      icon: Mail,
      action: "mailto:orders.starscollection@gmail.com",
      color: "bg-gold"
    }
  ];

  return (
    <section id="contact" className="py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Text and Buttons */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-12">
          <header className="space-y-6">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-[10px] font-bold text-gold uppercase tracking-widest">
               Connect
             </div>
             <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
               Visit Our <br />
               <span className="text-gold italic font-light">Boutique</span>
             </h2>
             <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
               Experience the allure of Stars Collection in person. Visit us at Abbottabad's heart for a curated luxury experience.
             </p>
          </header>

          <div className="space-y-6">
            {contactMethods.map((method) => (
              <a 
                key={method.label}
                href={method.action}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 bg-surface/30 border border-white/5 rounded-[2rem] hover:bg-surface/50 transition-all hover:-translate-x-2"
              >
                <div className="flex items-center gap-6">
                   <div className={`w-12 h-12 rounded-2xl ${method.color}/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                      <method.icon className="w-5 h-5" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-gold">{method.label}</p>
                      <p className="text-white font-bold">{method.value}</p>
                   </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-700 group-hover:text-gold transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Map and Physical location */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-8">
           <div className="p-8 bg-surface/30 border border-white/5 rounded-[3rem] space-y-8 flex flex-col md:flex-row gap-8 items-start lg:items-center">
              <div className="w-16 h-16 rounded-3xl bg-gold/10 flex items-center justify-center text-gold shrink-0">
                 <MapPin className="w-8 h-8" />
              </div>
              <div className="space-y-4 flex-1">
                 <h3 className="text-2xl font-black text-white tracking-widest uppercase">Physical Address</h3>
                 <p className="text-gray-400 font-light leading-relaxed">
                   TANCHI CHOWK, MOTI BAZAR, ABBOTTABAD, PAKISTAN
                 </p>
                 <a 
                   href={googleMapsUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 text-gold font-black text-[10px] uppercase tracking-widest hover:underline pt-2"
                 >
                   Open in Google Maps <ExternalLink className="w-3 h-3" />
                 </a>
              </div>
              <div className="hidden md:block w-px h-24 bg-white/5" />
              <div className="space-y-4">
                 <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-4 h-4 text-gold" />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Opening Hours</span>
                 </div>
                 <p className="text-white font-bold">Mon - Sat</p>
                 <p className="text-gold text-xs font-medium">10:00 AM - 08:00 PM</p>
              </div>
           </div>

           {/* Embed-like Map Placeholder Area */}
           <div className="h-[400px] w-full rounded-[3rem] bg-white/5 border border-white/5 relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1524660987458-55a0cddf8456?q=80&w=1200&auto=format&fit=crop" 
                alt="Map Background"
                className="w-full h-full object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <a 
                   href={googleMapsUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="px-8 py-4 bg-gold text-dark font-black rounded-full shadow-2xl shadow-gold/20 hover:scale-105 transition-all text-xs tracking-widest uppercase"
                 >
                   Interactive Map Access
                 </a>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
