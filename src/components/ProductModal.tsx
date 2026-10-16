import React, { useState } from 'react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';
import {
  X,
  MessageCircle,
  BookmarkPlus,
  Check,
  Ruler,
  ShieldCheck,
  Truck,
  Sparkles,
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenWhatsApp: (product: Product, selectedSize: string) => void;
  onToggleWishlist: (product: Product, selectedSize?: string) => void;
  isInWishlist: boolean;
  onOpenSizeGuide: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenWhatsApp,
  onToggleWishlist,
  isInWishlist,
  onOpenSizeGuide,
}) => {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/#catalogo?producto=${product.id}&talle=${encodeURIComponent(selectedSize)}`
    );
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#2D312E]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-3xl bg-[#FAFAF7] rounded-2xl border border-[#2D312E]/10 shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#2D312E]/10 bg-[#F3EFEA]/60">
          <div className="flex items-center gap-2 text-xs text-[#2D312E]/70 font-medium">
            <span>{product.collectionLabel}</span>
            <span aria-hidden="true">·</span>
            <span>SKU: {product.sku}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ficha de producto"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#2D312E]/70 hover:text-[#2D312E] hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Visual Column */}
            <div>
              <div className="rounded-xl overflow-hidden border border-[#2D312E]/10">
                <ProductVisual product={product} isLarge={true} />
              </div>

              {/* Showroom & Delivery micro badges */}
              <div className="mt-3 bg-[#F3EFEA] rounded-lg p-3 text-xs space-y-1.5 text-[#2D312E]/80">
                <div className="flex items-center gap-2 text-[#8FA89B] font-semibold">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Muestra en Showroom Cumbayá (Quito) disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#D97D64] shrink-0" />
                  <span>Envíos por Servientrega a todo Ecuador en 24-48h</span>
                </div>
              </div>
            </div>

            {/* Info & Purchase Spec Column */}
            <div className="space-y-4">
              <div>
                <h2
                  id="product-modal-title"
                  className="text-2xl font-bold text-[#2D312E] font-display leading-tight"
                >
                  {product.name}
                </h2>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#D97D64] font-display tabular-nums">
                    ${product.priceUsd.toFixed(2)} USD
                  </span>
                  <span className="text-xs text-[#2D312E]/60">
                    (Precio de referencia minorista)
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#2D312E]/85 leading-relaxed">
                {product.description}
              </p>

              {/* Special highlight */}
              <div className="bg-[#8FA89B]/15 border border-[#8FA89B]/30 rounded-lg p-3 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#8FA89B] shrink-0 mt-0.5" />
                <p className="text-xs text-[#2D312E] font-medium leading-relaxed">
                  <strong className="text-[#2D312E]">Detalle diferencial:</strong> {product.highlight}
                </p>
              </div>

              {/* Color Selection */}
              <div>
                <span className="block text-xs font-semibold text-[#2D312E] mb-1.5">
                  Color disponible: <span className="font-normal text-[#2D312E]/70">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`h-7 px-2.5 rounded-md text-xs font-medium border flex items-center gap-1.5 transition-all ${
                        selectedColor === c.name
                          ? 'border-[#2D312E] bg-white shadow-xs text-[#2D312E]'
                          : 'border-[#2D312E]/15 bg-[#F3EFEA] text-[#2D312E]/70 hover:border-[#2D312E]/40'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/10"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection with Link to Guide */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-[#2D312E]">
                    Talle seleccionado: <strong className="text-[#D97D64]">{selectedSize}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={onOpenSizeGuide}
                    className="text-xs text-[#8FA89B] hover:text-[#2D312E] font-medium flex items-center gap-1 underline underline-offset-2 transition-colors"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Ver tabla de medidas</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                        selectedSize === s
                          ? 'bg-[#2D312E] text-white border-[#2D312E] shadow-xs'
                          : 'bg-[#F3EFEA] text-[#2D312E] border-[#2D312E]/10 hover:border-[#2D312E]/30'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Consultation Call to Action */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => onOpenWhatsApp(product, selectedSize)}
                  className="w-full py-3 px-4 bg-[#D97D64] hover:bg-[#c96c53] text-white font-medium text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-colors min-h-[46px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar disponibilidad en WhatsApp ({selectedSize})</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product, selectedSize)}
                    className={`py-2.5 px-3 text-xs font-medium rounded-xl border flex items-center justify-center gap-1.5 transition-colors min-h-[42px] ${
                      isInWishlist
                        ? 'bg-[#8FA89B]/20 border-[#8FA89B] text-[#2D312E]'
                        : 'bg-[#F3EFEA] border-[#2D312E]/15 text-[#2D312E] hover:bg-[#EAE4DC]'
                    }`}
                  >
                    {isInWishlist ? (
                      <>
                        <Check className="w-4 h-4 text-[#8FA89B]" />
                        <span>Guardado en lista</span>
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="w-4 h-4" />
                        <span>Guardar en mi lista</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="py-2.5 px-3 text-xs font-medium rounded-xl border border-[#2D312E]/15 bg-[#F3EFEA] text-[#2D312E] hover:bg-[#EAE4DC] flex items-center justify-center gap-1.5 transition-colors min-h-[42px]"
                  >
                    {copiedNotification ? (
                      <span className="text-[#8FA89B] font-semibold">¡Enlace copiado!</span>
                    ) : (
                      <span>Compartir ficha</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Accordion / Details */}
          <div className="pt-4 border-t border-[#2D312E]/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#F3EFEA]/80 rounded-xl p-4">
              <h4 className="font-semibold text-sm text-[#2D312E] font-display mb-2">
                Composición & Tejido
              </h4>
              <p className="text-[#2D312E]/80 leading-relaxed">
                {product.materials}
              </p>
              <ul className="mt-2 space-y-1 text-[#2D312E]/75">
                <li>• Hipoalergénico y libre de tinturas pesadas.</li>
                <li>• Confección ética en taller especializado de Ecuador.</li>
                <li>• Botones seguros y costuras reforzadas.</li>
              </ul>
            </div>

            <div className="bg-[#F3EFEA]/80 rounded-xl p-4">
              <h4 className="font-semibold text-sm text-[#2D312E] font-display mb-2">
                Cuidados de Lavado
              </h4>
              <ul className="space-y-1.5 text-[#2D312E]/80 leading-relaxed">
                {product.careInstructions.map((instruction, idx) => (
                  <li key={idx}>• {instruction}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
