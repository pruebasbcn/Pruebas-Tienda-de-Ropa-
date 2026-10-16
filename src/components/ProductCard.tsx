import React from 'react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';
import { MessageCircle, Eye, BookmarkPlus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
  onOpenWhatsApp: (product: Product, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenModal,
  onOpenWhatsApp,
  onToggleWishlist,
  isInWishlist,
}) => {
  return (
    <article
      className="group relative bg-[#FAFAF7] rounded-xl border border-[#2D312E]/10 overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Visual Product Display with click to view sheet */}
      <div
        onClick={() => onOpenModal(product)}
        className="cursor-pointer relative overflow-hidden"
      >
        <ProductVisual product={product} />

        {/* Floating Quick Action: Wishlist Bookmark */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isInWishlist ? 'Quitar de lista de consulta' : 'Guardar en lista de consulta'}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isInWishlist
              ? 'bg-[#D97D64] text-white shadow-sm'
              : 'bg-white/80 backdrop-blur-sm text-[#2D312E] hover:bg-white border border-[#2D312E]/10'
          }`}
        >
          {isInWishlist ? <Check className="w-4 h-4 stroke-[2.5]" /> : <BookmarkPlus className="w-4 h-4" />}
        </button>
      </div>

      {/* Card Content & Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: unboxed clean text with · separators (No pills!) */}
          <div className="flex items-center gap-1.5 text-xs text-[#2D312E]/70 mb-1.5 font-medium">
            <span>{product.collectionLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.ageLabel}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenModal(product)}
            className="text-base font-semibold text-[#2D312E] font-display hover:text-[#D97D64] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Material highlight */}
          <p className="mt-1 text-xs text-[#2D312E]/80 line-clamp-2 leading-relaxed">
            {product.materials}
          </p>
        </div>

        {/* Pricing & Sizing strip */}
        <div className="mt-4 pt-3 border-t border-[#2D312E]/10">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs text-[#2D312E]/60 block font-normal">Precio de referencia</span>
              <span className="text-lg font-bold text-[#2D312E] font-display tabular-nums tracking-tight">
                ${product.priceUsd.toFixed(2)}{' '}
                <span className="text-xs font-normal text-[#2D312E]/60">USD</span>
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#8FA89B] font-semibold block">
                Talles disponibles
              </span>
              <span className="text-xs text-[#2D312E]/80 font-medium">
                {product.sizes[0]} - {product.sizes[product.sizes.length - 1]}
              </span>
            </div>
          </div>

          {/* Dual Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onOpenModal(product)}
              className="py-2.5 px-3 text-xs font-semibold text-[#2D312E] bg-[#F3EFEA] hover:bg-[#EAE4DC] rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap min-h-[42px]"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver ficha</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenWhatsApp(product)}
              className="py-2.5 px-3 text-xs font-semibold text-white bg-[#D97D64] hover:bg-[#c96c53] rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap min-h-[42px]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Consultar</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
