"use client";

import { Edit, Trash2, Eye, Star, AlertCircle } from "lucide-react";
import Link from "next/link";

interface AdminProductTableProps {
  products: any[];
  onDelete: (id: string) => void;
}

export default function AdminProductTable({ products, onDelete }: AdminProductTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/5 bg-surface/10 backdrop-blur-xl">
      <table className="w-full text-left border-collapse">
        <thead className="bg-white/5 text-[10px] uppercase font-bold tracking-widest text-gray-400">
          <tr>
            <th className="px-6 py-4">Product</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Stock</th>
            <th className="px-6 py-4">Featured</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {products.map((product) => (
            <tr key={product._id} className="group hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/10">
                    <img
                      src={product.images[0] || "https://placehold.co/100x100?text=Product"}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-semibold text-white line-clamp-1">{product.name}</p>
                    <p className="text-xs text-gray-500 font-medium">{product.brand}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs text-gray-400 font-medium capitalize">
                  {product.category.replace("-", " ")}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  {product.discountPrice ? (
                    <>
                      <span className="text-sm font-bold text-white">${product.discountPrice}</span>
                      <span className="text-[10px] text-gray-500 line-through">${product.price}</span>
                    </>
                  ) : (
                    <span className="text-sm font-bold text-white">${product.price}</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${product.stock < 10 ? 'text-red-400' : 'text-white'}`}>
                    {product.stock}
                  </span>
                  {product.stock < 10 && (
                    <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                {product.isFeatured ? (
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center">
                    <Star className="w-3.5 h-3.5 text-gold fill-current" />
                  </div>
                ) : (
                  <span className="text-gray-600">-</span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/products/${product._id}`}
                    target="_blank"
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    title="View Product"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/admin/products/${product._id}/edit`}
                    className="p-2 text-gray-400 hover:text-gold hover:bg-gold/5 rounded-lg transition-all"
                    title="Edit Product"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
