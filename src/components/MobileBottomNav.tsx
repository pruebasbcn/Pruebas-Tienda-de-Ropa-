import React from 'react';
import { Home, Sparkles, Ruler, ShoppingBag, MessageCircle } from 'lucide-react';

interface MobileBottomNavProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenSizeGuide: () => void;
  onOpenWhatsApp: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  wishlistCount,
  onOpenWishlist,
  onOpenSizeGuide,
  onOpenWhatsApp,
}) => {
  return (
    <nav
      role="navigation"
      aria-label="Navegación rápida en celular"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAFAF7]/95 backdrop-blur-md border-t border-[#2D312E]/10 pb-safe shadow-lg"
      style={{ maxHeight: '64px' }}
    >
      <div className="grid grid-cols-5 h-14 items-center px-1">
        <a
          href="/"
          className="flex flex-col items-center justify-center text-[10px] text-[#2D312E]/70 hover:text-[#2D312E] active:scale-95 transition-transform"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Inicio</span>
        </a>

        <a
          href="#catalogo"
          className="flex flex-col items-center justify-center text-[10px] text-[#2D312E]/70 hover:text-[#2D312E] active:scale-95 transition-transform"
        >
          <Sparkles className="w-5 h-5 mb-0.5 text-[#D97D64]" />
          <span>Prendas</span>
        </a>

        <button
          type="button"
          onClick={onOpenSizeGuide}
          className="flex flex-col items-center justify-center text-[10px] text-[#2D312E]/70 hover:text-[#2D312E] active:scale-95 transition-transform"
        >
          <Ruler className="w-5 h-5 mb-0.5 text-[#8FA89B]" />
          <span>Talles</span>
        </button>

        <button
          type="button"
          onClick={onOpenWishlist}
          className="relative flex flex-col items-center justify-center text-[10px] text-[#2D312E]/70 hover:text-[#2D312E] active:scale-95 transition-transform"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5 text-[#2D312E]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#D97D64] text-white text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span>Consulta</span>
        </button>

        <button
          type="button"
          onClick={onOpenWhatsApp}
          className="flex flex-col items-center justify-center text-[10px] text-[#8FA89B] font-semibold active:scale-95 transition-transform"
        >
          <MessageCircle className="w-5 h-5 mb-0.5 text-[#8FA89B]" />
          <span>WhatsApp</span>
        </button>
      </div>
    </nav>
  );
};
