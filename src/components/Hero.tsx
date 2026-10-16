import React from 'react';
import { STORE_INFO } from '../data/mockData';
import { MessageCircle, Sparkles, ShieldCheck, Ruler, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenSizeGuide: () => void;
  onOpenWhatsApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onOpenSizeGuide,
  onOpenWhatsApp,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF7] pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-[#2D312E]/10">
      {/* Decorative subtle background aura */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#8FA89B]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-[#D97D64]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Quiet Subtitle / Location Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[#2D312E]/80 bg-[#F3EFEA] px-3.5 py-1.5 rounded-full border border-[#2D312E]/10">
              <span className="w-2 h-2 rounded-full bg-[#D97D64]" />
              <span>Showroom Cumbayá · Quito, Ecuador</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#8FA89B] font-semibold">Temporada 2026</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#2D312E] font-display tracking-tight leading-[1.15]">
              Ropa infantil pensada con ternura,{' '}
              <span className="text-[#D97D64] inline-block">suavidad noble</span> y libertad de juego.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#2D312E]/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Catálogo de referencia y prendas exclusivas confeccionadas en algodón pima orgánico y lino natural. Cuidamos cada fibra para abrazar el crecimiento de tu bebé en Ecuador.
            </p>

            {/* Action Buttons (Strict touch targets >= 44px) */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="w-full sm:w-auto py-3.5 px-6 bg-[#D97D64] hover:bg-[#c96c53] text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 min-h-[46px]"
              >
                <span>Ver catálogo de referencia</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto py-3.5 px-6 bg-[#F3EFEA] hover:bg-[#EAE4DC] text-[#2D312E] text-sm font-semibold rounded-xl border border-[#2D312E]/15 transition-all duration-200 flex items-center justify-center gap-2 min-h-[46px]"
              >
                <MessageCircle className="w-4 h-4 text-[#8FA89B]" />
                <span>Consultar por WhatsApp</span>
              </button>
            </div>

            {/* Secondary Link */}
            <div className="pt-1 flex items-center justify-center lg:justify-start gap-4 text-xs text-[#2D312E]/70">
              <button
                type="button"
                onClick={onOpenSizeGuide}
                className="hover:text-[#2D312E] flex items-center gap-1.5 underline underline-offset-4 decoration-[#8FA89B]"
              >
                <Ruler className="w-3.5 h-3.5 text-[#8FA89B]" />
                <span>Consultar tabla de talles interactiva</span>
              </button>
            </div>
          </div>

          {/* Right Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#F3EFEA] rounded-3xl p-6 sm:p-8 border border-[#2D312E]/10 shadow-sm overflow-hidden">
              {/* Moon Badge */}
              <div className="flex items-center justify-between pb-5 border-b border-[#2D312E]/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#8FA89B] flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#2D312E] font-display">
                      Algodón Pima Ecuatoriano
                    </h3>
                    <p className="text-[11px] text-[#2D312E]/60">100% Hipoalergénico certificado</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#D97D64] bg-white/80 px-2.5 py-1 rounded-md border border-[#2D312E]/10">
                  Calidad Boutique
                </span>
              </div>

              {/* Graphic Composition Vignette */}
              <div className="py-6 flex items-center justify-center">
                <div className="w-full max-w-xs bg-white rounded-2xl p-5 border border-[#2D312E]/10 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8FA89B] font-semibold">Enterito Pima Selva</span>
                    <span className="font-bold text-[#2D312E] tabular-nums">$24.50 USD</span>
                  </div>
                  <div className="h-28 bg-[#F3EFEA] rounded-xl flex items-center justify-center relative overflow-hidden">
                    <svg className="w-20 h-24" viewBox="0 0 120 140" fill="none">
                      <path
                        d="M38 18 C38 28, 82 28, 82 18 L102 36 L92 52 L80 44 L80 96 C80 110, 68 118, 60 112 C52 118, 40 110, 40 96 L40 44 L28 52 L18 36 Z"
                        fill="#8FA89B"
                        stroke="#2D312E"
                        strokeWidth="2"
                      />
                      <circle cx="60" cy="46" r="2.5" fill="#FAFAF7" />
                      <circle cx="60" cy="62" r="2.5" fill="#FAFAF7" />
                    </svg>
                  </div>
                  <p className="text-[11px] text-[#2D312E]/70 text-center leading-normal">
                    Confeccionado sin etiquetas interiores raspantes ni tinturas agresivas.
                  </p>
                </div>
              </div>

              {/* Guarantee bullets */}
              <div className="pt-2 border-t border-[#2D312E]/10 grid grid-cols-2 gap-3 text-xs text-[#2D312E]/80">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8FA89B] shrink-0" />
                  <span>Costuras planas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8FA89B] shrink-0" />
                  <span>Broches sin níquel</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency Strip */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#2D312E]/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div>
            <span className="block text-2xl sm:text-3xl font-bold text-[#2D312E] font-display tabular-nums">
              100%
            </span>
            <span className="text-xs text-[#2D312E]/70 font-medium mt-0.5 block">
              Fibras nobles (Algodón Pima & Lino)
            </span>
          </div>

          <div>
            <span className="block text-2xl sm:text-3xl font-bold text-[#D97D64] font-display tabular-nums">
              24-48h
            </span>
            <span className="text-xs text-[#2D312E]/70 font-medium mt-0.5 block">
              Envíos por Servientrega en Ecuador
            </span>
          </div>

          <div>
            <span className="block text-2xl sm:text-3xl font-bold text-[#8FA89B] font-display tabular-nums">
              30 días
            </span>
            <span className="text-xs text-[#2D312E]/70 font-medium mt-0.5 block">
              Garantía de cambio en Showroom
            </span>
          </div>

          <div>
            <span className="block text-2xl sm:text-3xl font-bold text-[#2D312E] font-display tabular-nums">
              0%
            </span>
            <span className="text-xs text-[#2D312E]/70 font-medium mt-0.5 block">
              Sintéticos que irritan la piel
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
