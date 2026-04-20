import Link from "next/link";
import { Star, ArrowUpRight, ArrowRight, Tag } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    category: string;
    images: string[];
    brand: string;
    rating: number;
    discountPrice?: number;
  };
  promotions: any[];
}

export default function ProductCard({ product, promotions = [] }: ProductCardProps) {
  // Logic to find active promotion
  const activePromo = promotions.find(p => 
    p.targetType === "all" || 
    (p.targetType === "category" && p.targetId === product.category) ||
    (p.targetType === "product" && p.targetId === product._id)
  );

  const discountPercentage = activePromo ? activePromo.discountPercentage : 0;
  const promoPrice = activePromo 
    ? Math.round(product.price * (1 - discountPercentage / 100))
    : product.discountPrice;

  const hasDiscount = (activePromo || (product.discountPrice && product.discountPrice < product.price));
  const finalPrice = promoPrice || product.price;

  return (
    <div className="group glass-panel rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/10 hover:border-gold/30 flex flex-col h-full relative cursor-pointer">
      <div className="aspect-square relative overflow-hidden bg-surface-light/20">
        <Image
          src={product.images[0] || "https://placehold.co/400x400?text=Product"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        
        {activePromo ? (
          <div className="absolute top-4 left-4 bg-gold text-dark text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1.5 animate-pulse">
            <Tag className="w-3 h-3" />
            {activePromo.title} (-{discountPercentage}%)
          </div>
        ) : product.discountPrice && product.discountPrice < product.price ? (
          <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-gold text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-gold/20">
            Special Edition
          </div>
        ) : null}
        
        {/* Overlay Buttons on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-dark/95 via-dark/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex gap-2 backdrop-blur-sm">
           <Link 
             href={`/products/${product._id}`}
             className="flex-1 py-3 bg-gold text-dark text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-yellow-500 hover:scale-[1.02] transition-all text-center flex items-center justify-center gap-2"
           >
             View Details
             <ArrowUpRight className="w-4 h-4" />
           </Link>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 space-y-3">
        <div className="flex justify-between items-start">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">
            {product.category}
          </span>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-surface border border-white/5 text-[10px] font-bold text-yellow-400">
            <Star className="w-3 h-3 fill-current" />
            <span>{product.rating}</span>
          </div>
        </div>

        <Link href={`/products/${product._id}`}>
          <h3 className="font-bold text-white text-lg leading-tight line-clamp-2 group-hover:text-gold transition-colors heading-luxury tracking-wide">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          {product.brand}
        </p>

        <div className="pt-4 mt-auto border-t border-white/10 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
               <span className="text-xl font-black text-foreground heading-luxury">Rs. {finalPrice}</span>
               {hasDiscount && (
                 <span className="text-[10px] text-gray-500 line-through font-bold">Rs. {product.price}</span>
               )}
            </div>
            {activePromo && (
              <span className="text-[9px] text-gold font-bold uppercase tracking-wider mt-0.5">Limited Time Release</span>
            )}
          </div>
          
          <Link href={`/products/${product._id}`} className="p-2 text-gold group-hover:translate-x-1 transition-transform">
             <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
