import React, { useState } from 'react';
import { ShoppingBag, Menu, X, MessageCircle, Ruler } from 'lucide-react';

interface NavbarProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenSizeGuide: () => void;
  onOpenWhatsApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wishlistCount,
  onOpenWishlist,
  onOpenSizeGuide,
  onOpenWhatsApp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#2D312E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D312E] whitespace-nowrap shrink-0 font-display flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97D64]" />
            <span>Pequeña Luna</span>
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2D312E]/80">
            <a
              href="#catalogo"
              className="hover:text-[#2D312E] hover:underline underline-offset-6 decoration-[#D97D64] transition-colors whitespace-nowrap shrink-0"
            >
              Colecciones
            </a>
            <button
              type="button"
              onClick={onOpenSizeGuide}
              className="hover:text-[#2D312E] hover:underline underline-offset-6 decoration-[#8FA89B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Guía de Talles
            </button>
            <a
              href="#nosotros"
              className="hover:text-[#2D312E] hover:underline underline-offset-6 decoration-[#8FA89B] transition-colors whitespace-nowrap shrink-0"
            >
              Nuestro Equipo
            </a>
            <a
              href="#contacto"
              className="hover:text-[#2D312E] hover:underline underline-offset-6 decoration-[#D97D64] transition-colors whitespace-nowrap shrink-0"
            >
              Showroom & Contacto
            </a>
          </nav>

          {/* Zone 3: 1 primary action (or action cluster on mobile) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick consultation wishlist button */}
            <button
              type="button"
              onClick={onOpenWishlist}
              className="relative p-2.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-[#2D312E] bg-[#F3EFEA] hover:bg-[#EAE4DC] rounded-xl border border-[#2D312E]/10 transition-colors flex items-center gap-2"
              aria-label={`Ver lista de consulta (${wishlistCount} artículos)`}
            >
              <ShoppingBag className="w-4 h-4 text-[#D97D64]" />
              <span className="hidden sm:inline">Mi Consulta</span>
              {wishlistCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#D97D64] text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp button on desktop */}
            <button
              type="button"
              onClick={onOpenWhatsApp}
              className="hidden lg:flex items-center gap-1.5 py-2 px-3.5 text-xs font-semibold text-white bg-[#8FA89B] hover:bg-[#7b9789] rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Showroom</span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú de navegación"
              className="md:hidden p-2 rounded-xl text-[#2D312E] hover:bg-[#F3EFEA]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2D312E]/10 bg-[#FAFAF7] px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-[#2D312E]">
            <a
              href="#catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-[#F3EFEA] transition-colors"
            >
              Colecciones & Prendas
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSizeGuide();
              }}
              className="w-full text-left py-2.5 px-3 rounded-lg hover:bg-[#F3EFEA] transition-colors flex items-center gap-2"
            >
              <Ruler className="w-4 h-4 text-[#8FA89B]" />
              <span>Tabla de Talles y Medidas</span>
            </button>
            <a
              href="#nosotros"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-[#F3EFEA] transition-colors"
            >
              Sobre Pequeña Luna & Equipo
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-[#F3EFEA] transition-colors"
            >
              Showroom en Cumbayá & Contacto
            </a>
          </nav>

          <div className="pt-2 border-t border-[#2D312E]/10 space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsApp();
              }}
              className="w-full py-3 px-4 bg-[#8FA89B] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear con Showroom Cumbayá</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
