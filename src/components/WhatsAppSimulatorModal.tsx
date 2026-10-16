import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { STORE_INFO } from '../data/mockData';
import { X, MessageCircle, Copy, Check, Send, Sparkles, Smartphone } from 'lucide-react';

interface WhatsAppSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  selectedSize?: string;
  onSaveInquiry: (inquiryData: {
    name: string;
    phone: string;
    message: string;
    productName: string;
    productSize: string;
  }) => void;
}

export const WhatsAppSimulatorModal: React.FC<WhatsAppSimulatorModalProps> = ({
  isOpen,
  onClose,
  product,
  selectedSize,
  onSaveInquiry,
}) => {
  if (!isOpen) return null;

  const defaultSize = selectedSize || (product ? product.sizes[0] : 'Talle a convenir');
  const defaultColor = product ? product.colors[0]?.name : 'Color a convenir';

  const initialMessage = product
    ? `¡Hola Pequeña Luna! Quisiera consultar la disponibilidad de:
• Prenda: ${product.name} (SKU: ${product.sku})
• Talle: ${defaultSize}
• Color preferido: ${defaultColor}
• Precio de referencia: $${product.priceUsd.toFixed(2)} USD

¿Tienen stock disponible en el showroom de Cumbayá o para envío nacional por Servientrega? ¡Gracias!`
    : `¡Hola Pequeña Luna! Quisiera asesoramiento sobre la colección de temporada y los talles recomendados para mi bebé. ¿Podrían orientarme?`;

  const [messageText, setMessageText] = useState(initialMessage);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [hasCopied, setHasCopied] = useState(false);
  const [hasSentSimulated, setHasSentSimulated] = useState(false);

  useEffect(() => {
    setMessageText(initialMessage);
    setHasSentSimulated(false);
  }, [product, selectedSize]);

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2500);
  };

  const handleSendSimulated = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveInquiry({
      name: userName || 'Cliente WhatsApp',
      phone: userPhone || 'Consulta directa',
      message: messageText,
      productName: product?.name || 'Consulta General',
      productSize: defaultSize,
    });
    setHasSentSimulated(true);
  };

  const realWhatsAppUrl = `https://wa.me/593987654321?text=${encodeURIComponent(messageText)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#2D312E]/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-lg bg-[#FAFAF7] rounded-2xl border border-[#2D312E]/10 shadow-2xl overflow-hidden my-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* WhatsApp App-like Header */}
        <div className="bg-[#2D312E] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#8FA89B] flex items-center justify-center text-white font-bold text-sm">
              PL
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm font-display">Pequeña Luna</span>
                <span className="text-[10px] bg-[#8FA89B]/40 px-1.5 py-0.2 rounded text-[#FAFAF7]">
                  Ecuador
                </span>
              </div>
              <p className="text-[11px] text-[#FAFAF7]/70">
                Showroom Cumbayá · {STORE_INFO.phoneDisplay}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar simulador"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice of simulated state for Kodarvia review */}
        <div className="bg-[#8FA89B]/15 border-b border-[#8FA89B]/30 px-4 py-2 text-[11px] text-[#2D312E] flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#8FA89B]" />
            <span>Módulo de enlace y simulación comercial para WhatsApp</span>
          </div>
          <span className="text-[10px] text-[#2D312E]/60">Sin APIs externas</span>
        </div>

        {/* Main Body */}
        <div className="p-5 space-y-4">
          {hasSentSimulated ? (
            <div className="py-6 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-[#8FA89B]/20 text-[#8FA89B] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-base font-bold text-[#2D312E] font-display">
                ¡Consulta registrada con éxito!
              </h3>
              <p className="text-xs text-[#2D312E]/80 max-w-sm mx-auto leading-relaxed">
                Tu solicitud por <strong>{product?.name || 'la prenda'}</strong> (Talle: {defaultSize}) ha sido almacenada en el registro de <code>localStorage</code> del navegador.
              </p>

              <div className="bg-[#F3EFEA] rounded-xl p-3 text-xs text-[#2D312E]/80 text-left space-y-1">
                <p><strong>Nro. de seguimiento:</strong> PL-EC-{Date.now().toString().slice(-6)}</p>
                <p><strong>Atención estimada:</strong> Sofía te responderá dentro del horario de showroom (10:00 - 19:00).</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={realWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 text-xs font-semibold bg-[#2D312E] text-white rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-1.5"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Abrir en WhatsApp Web / Celular</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 text-xs font-semibold bg-[#F3EFEA] text-[#2D312E] rounded-lg hover:bg-[#EAE4DC] transition-colors"
                >
                  Volver al catálogo
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendSimulated} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#2D312E] mb-1">
                  Mensaje preformateado para Pequeña Luna:
                </label>
                <div className="relative">
                  <textarea
                    rows={6}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full text-xs font-sans text-[#2D312E] bg-[#F3EFEA] p-3 rounded-xl border border-[#2D312E]/15 focus:outline-none focus:ring-1 focus:ring-[#D97D64] resize-none leading-relaxed"
                  />
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="absolute top-2.5 right-2.5 py-1 px-2 text-[11px] font-medium bg-white/90 text-[#2D312E] hover:bg-white rounded-md border border-[#2D312E]/10 flex items-center gap-1 shadow-2xs"
                  >
                    {hasCopied ? (
                      <>
                        <Check className="w-3 h-3 text-[#8FA89B]" />
                        <span>Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar texto</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Optional user details for simulated registry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#2D312E] mb-1">
                    Tu nombre (opcional para el registro):
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. María Fernanda"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-[#2D312E]/15 focus:outline-none focus:ring-1 focus:ring-[#D97D64]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#2D312E] mb-1">
                    Tu celular / WhatsApp (opcional):
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej. 099 123 4567"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-[#2D312E]/15 focus:outline-none focus:ring-1 focus:ring-[#D97D64]"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#D97D64] hover:bg-[#c96c53] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs min-h-[44px]"
                >
                  <Send className="w-4 h-4" />
                  <span>Simular envío de consulta (Guarda en localStorage)</span>
                </button>

                <div className="flex items-center justify-between text-xs text-[#2D312E]/70 pt-1">
                  <span>¿Preferís abrir WhatsApp directamente?</span>
                  <a
                    href={realWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8FA89B] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Abrir enlace wa.me</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
