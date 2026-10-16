import React from 'react';
import { Product } from '../types';
import { X, Trash2, MessageCircle, Send, ShoppingBag } from 'lucide-react';

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: { product: Product; selectedSize: string }[];
  onRemoveItem: (productId: string) => void;
  onClearWishlist: () => void;
  onConsultBulkWhatsApp: (items: { product: Product; selectedSize: string }[]) => void;
  onFillContactForm: (items: { product: Product; selectedSize: string }[]) => void;
}

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveItem,
  onClearWishlist,
  onConsultBulkWhatsApp,
  onFillContactForm,
}) => {
  if (!isOpen) return null;

  const totalReferenceUsd = wishlist.reduce((acc, item) => acc + item.product.priceUsd, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-[#2D312E]/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-md bg-[#FAFAF7] h-full shadow-2xl flex flex-col border-l border-[#2D312E]/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-[#2D312E]/10 bg-[#F3EFEA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D97D64]" />
            <h2 id="inquiry-drawer-title" className="text-base font-bold text-[#2D312E] font-display">
              Mi Selección de Consulta ({wishlist.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar selección"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#2D312E]/70 hover:text-[#2D312E] hover:bg-black/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#F3EFEA] flex items-center justify-center mx-auto text-[#2D312E]/40">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-[#2D312E] font-display">
                Tu lista de consulta está vacía
              </p>
              <p className="text-xs text-[#2D312E]/70 max-w-xs mx-auto leading-relaxed">
                Navegá por nuestro catálogo y guardá los artículos que desees consultar juntos por WhatsApp o formulario.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlist.map(({ product, selectedSize }) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl p-3 border border-[#2D312E]/10 flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] text-[#8FA89B] font-semibold uppercase tracking-wider block truncate">
                      {product.collectionLabel}
                    </span>
                    <h4 className="text-xs font-bold text-[#2D312E] truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-[#2D312E]/70 mt-0.5">
                      <span>Talle: <strong>{selectedSize}</strong></span>
                      <span>·</span>
                      <span className="font-semibold text-[#2D312E] tabular-nums">
                        ${product.priceUsd.toFixed(2)} USD
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(product.id)}
                    aria-label={`Eliminar ${product.name} de la lista`}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2D312E]/40 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="pt-2 flex justify-between items-center text-xs">
                <button
                  type="button"
                  onClick={onClearWishlist}
                  className="text-[#2D312E]/60 hover:text-red-600 underline"
                >
                  Vaciar toda la lista
                </button>
                <div className="text-right">
                  <span className="text-[#2D312E]/60 block text-[11px]">Total estimado de referencia:</span>
                  <span className="text-base font-bold text-[#2D312E] font-display tabular-nums">
                    ${totalReferenceUsd.toFixed(2)} USD
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Actions */}
        {wishlist.length > 0 && (
          <div className="p-5 border-t border-[#2D312E]/10 bg-[#F3EFEA]/80 space-y-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onConsultBulkWhatsApp(wishlist);
              }}
              className="w-full py-3 px-4 bg-[#D97D64] hover:bg-[#c96c53] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar todas ({wishlist.length}) por WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onFillContactForm(wishlist);
              }}
              className="w-full py-2.5 px-4 bg-white hover:bg-[#FAFAF7] text-[#2D312E] text-xs font-semibold rounded-xl border border-[#2D312E]/15 flex items-center justify-center gap-2 transition-colors min-h-[42px]"
            >
              <Send className="w-3.5 h-3.5 text-[#8FA89B]" />
              <span>Enviar consulta conjunta por formulario</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
