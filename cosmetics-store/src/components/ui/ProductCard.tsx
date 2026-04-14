import Link from "next/link";
import { Star, ArrowUpRight, ArrowRight } from "lucide-react";

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
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <div className="group bg-surface/30 backdrop-blur-md border border-white/5 rounded-[2rem] overflow-hidden transition-all hover:-translate-y-2 hover:bg-surface/50 flex flex-col h-full relative">
      <div className="aspect-square relative overflow-hidden bg-white/5">
        <img
          src={product.images[0] || "https://placehold.co/400x400?text=Product"}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
        {hasDiscount && (
          <div className="absolute top-4 left-4 bg-gold text-dark text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
            Special Offer
          </div>
        )}
        
        {/* Overlay Buttons on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-dark/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex gap-2">
           <button className="flex-1 py-3 bg-gold text-dark text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-yellow-500 transition-colors">
             Add to Cart
           </button>
           <Link 
             href={`/products/${product._id}`} 
             className="w-12 h-12 bg-white/10 backdrop-blur-md flex items-center justify-center rounded-xl text-white hover:bg-white/20 transition-colors"
           >
              <ArrowUpRight className="w-5 h-5" />
           </Link>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 space-y-3">
        <div className="flex justify-between items-start">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-black">
            {product.category}
          </span>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 text-[10px] font-bold text-yellow-400 border border-white/5">
            <Star className="w-3 h-3 fill-current" />
            <span>{product.rating}</span>
          </div>
        </div>

        <Link href={`/products/${product._id}`}>
          <h3 className="font-bold text-white text-lg leading-tight line-clamp-2 hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          {product.brand}
        </p>

        <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
          {hasDiscount ? (
            <div className="flex flex-col">
              <span className="text-xl font-black text-white">Rs. {product.discountPrice}</span>
              <span className="text-[10px] text-gray-500 line-through font-bold">Rs. {product.price}</span>
            </div>
          ) : (
            <span className="text-xl font-black text-white">Rs. {product.price}</span>
          )}
          
          <Link href={`/products/${product._id}`} className="p-2 text-gold hover:translate-x-1 transition-transform">
             <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
