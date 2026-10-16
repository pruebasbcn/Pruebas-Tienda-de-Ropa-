import React from 'react';
import { STORE_INFO } from '../data/mockData';
import { Sparkles, Shield, Heart, RefreshCw } from 'lucide-react';

interface FooterProps {
  onOpenSizeGuide: () => void;
  onOpenKodarviaPanel: () => void;
  onResetMockData: () => void;
  onOpenCookies: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSizeGuide,
  onOpenKodarviaPanel,
  onResetMockData,
  onOpenCookies,
}) => {
  return (
    <footer className="bg-[#2D312E] text-[#FAFAF7] pt-14 pb-24 md:pb-14 border-t border-[#2D312E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D97D64]" />
              <span className="text-xl font-bold font-display tracking-tight text-white">
                Pequeña Luna
              </span>
            </div>
            <p className="text-xs text-[#FAFAF7]/75 leading-relaxed">
              Tienda boutique y catálogo de referencia de ropa infantil en Ecuador. Confección consciente en algodón pima orgánico y fibras puras para la primera infancia.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#8FA89B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Showroom Cumbayá · Quito, Ecuador</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8FA89B] font-display">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs text-[#FAFAF7]/80">
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Colección & Catálogo
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Tabla de Talles y Medidas
                </button>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-white transition-colors">
                  Historia y Equipo Humano
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-white transition-colors">
                  Showroom Cumbayá & Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Showroom & Logistics */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D97D64] font-display">
              Visitas & Envíos
            </h4>
            <div className="space-y-2 text-xs text-[#FAFAF7]/75 leading-relaxed">
              <p>📍 {STORE_INFO.address}</p>
              <p>🕒 {STORE_INFO.hours}</p>
              <p>📦 Envíos en 24-48h por Servientrega a Quito, Guayaquil, Cuenca y todo el país.</p>
            </div>
          </div>

          {/* Kodarvia Evaluation & Simulation tools */}
          <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAFAF7] font-display flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#8FA89B]" />
              <span>Avisos Kodarvia (Demo)</span>
            </h4>
            <p className="text-[11px] text-[#FAFAF7]/70 leading-normal">
              Sin servicios externos conectados. Consultas y preferencias persisten en <code>localStorage</code>.
            </p>
            <div className="space-y-1.5 pt-1">
              <button
                type="button"
                onClick={onOpenKodarviaPanel}
                className="w-full py-1.5 px-2.5 bg-white/10 hover:bg-white/20 text-white rounded text-[11px] font-semibold text-left flex items-center justify-between transition-colors"
              >
                <span>Inspeccionar LocalStorage</span>
                <span>→</span>
              </button>
              <button
                type="button"
                onClick={onResetMockData}
                className="w-full py-1.5 px-2.5 bg-[#8FA89B]/20 hover:bg-[#8FA89B]/30 text-[#8FA89B] rounded text-[11px] font-semibold text-left flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reiniciar datos de ejemplo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAFAF7]/60">
          <p>© 2026 Pequeña Luna · Ecuador. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenCookies}
              className="hover:text-white underline transition-colors"
            >
              Preferencias de cookies
            </button>
            <span>·</span>
            <span className="flex items-center gap-1">
              Diseñado con <Heart className="w-3 h-3 text-[#D97D64]" /> para Kodarvia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
