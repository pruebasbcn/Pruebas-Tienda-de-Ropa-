import React from 'react';
import { Product } from '../types';

interface ProductVisualProps {
  product: Product;
  className?: string;
  isLarge?: boolean;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  className = '',
  isLarge = false,
}) => {
  const { silhouetteType, accentColor, colors } = product;

  // Render authentic stylized clothing illustration with fabric textures and warm tones
  return (
    <div
      className={`relative w-full overflow-hidden bg-[#F3EFEA] flex items-center justify-center select-none ${
        isLarge ? 'h-72 sm:h-96' : 'h-52 sm:h-64'
      } ${className}`}
      style={{
        backgroundColor: '#F3EFEA',
      }}
    >
      {/* Subtle organic background aura with brand color */}
      <div
        className="absolute w-44 h-44 rounded-full opacity-40 blur-2xl"
        style={{ backgroundColor: accentColor }}
      />

      {/* Subtle decorative moon emblem in upper corner */}
      <div className="absolute top-3 right-3 text-[#2D312E]/15 text-xs font-display flex items-center gap-1">
        <svg className="w-4 h-4 text-[#8FA89B]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.79c.45-.31.85-.7 1.18-1.15A8.96 8.96 0 0 0 12 3z" />
        </svg>
      </div>

      {/* Main product illustration */}
      <div className="relative z-10 transition-transform duration-300 group-hover:scale-105 flex flex-col items-center justify-center">
        {silhouetteType === 'onesie' && (
          <svg
            className={isLarge ? 'w-48 h-56' : 'w-32 h-40'}
            viewBox="0 0 120 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Onesie shape */}
            <path
              d="M38 18 C38 28, 82 28, 82 18 L102 36 L92 52 L80 44 L80 96 C80 110, 68 118, 60 112 C52 118, 40 110, 40 96 L40 44 L28 52 L18 36 Z"
              fill={accentColor}
              fillOpacity="0.88"
              stroke="#2D312E"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Collar stitch */}
            <path d="M44 23 C50 32, 70 32, 76 23" stroke="#FAFAF7" strokeWidth="2" strokeDasharray="3 3" />
            {/* Center wooden buttons */}
            <circle cx="60" cy="42" r="2.8" fill="#FAFAF7" stroke="#2D312E" strokeWidth="1" />
            <circle cx="60" cy="56" r="2.8" fill="#FAFAF7" stroke="#2D312E" strokeWidth="1" />
            <circle cx="60" cy="70" r="2.8" fill="#FAFAF7" stroke="#2D312E" strokeWidth="1" />
            {/* Pocket with moon stitch */}
            <rect x="48" y="78" width="24" height="20" rx="3" fill="#FAFAF7" fillOpacity="0.4" stroke="#2D312E" strokeWidth="1.5" />
            <path d="M57 85 A 3 3 0 0 0 63 91 A 4 4 0 0 1 57 85" fill="#2D312E" />
            {/* Bottom snap buttons */}
            <circle cx="54" cy="110" r="1.8" fill="#2D312E" />
            <circle cx="66" cy="110" r="1.8" fill="#2D312E" />
          </svg>
        )}

        {silhouetteType === 'dress' && (
          <svg
            className={isLarge ? 'w-48 h-56' : 'w-32 h-40'}
            viewBox="0 0 120 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ruffle straps */}
            <path d="M42 22 Q48 16 54 22 L54 44 L42 44 Z" fill="#8FA89B" stroke="#2D312E" strokeWidth="2" />
            <path d="M78 22 Q72 16 66 22 L66 44 L78 44 Z" fill="#8FA89B" stroke="#2D312E" strokeWidth="2" />
            {/* Bodice */}
            <path d="M40 44 L80 44 L84 62 L36 62 Z" fill="#8FA89B" stroke="#2D312E" strokeWidth="2" />
            {/* Gathered skirt */}
            <path
              d="M36 62 Q60 66 84 62 L104 122 Q60 128 16 122 Z"
              fill={accentColor}
              fillOpacity="0.9"
              stroke="#2D312E"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Skirt pleat lines */}
            <path d="M42 64 L34 120" stroke="#FAFAF7" strokeWidth="1.5" strokeOpacity="0.7" />
            <path d="M60 65 L60 124" stroke="#FAFAF7" strokeWidth="1.5" strokeOpacity="0.7" />
            <path d="M78 64 L86 120" stroke="#FAFAF7" strokeWidth="1.5" strokeOpacity="0.7" />
            {/* Hem scallop */}
            <path d="M22 118 Q30 122 38 118 Q46 122 54 118 Q62 122 70 118 Q78 122 86 118 Q94 122 100 118" stroke="#2D312E" strokeWidth="1.5" />
          </svg>
        )}

        {silhouetteType === 'overalls' && (
          <svg
            className={isLarge ? 'w-48 h-56' : 'w-32 h-40'}
            viewBox="0 0 120 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Straps */}
            <path d="M44 18 L44 48" stroke={accentColor} strokeWidth="7" strokeLinecap="round" />
            <path d="M76 18 L76 48" stroke={accentColor} strokeWidth="7" strokeLinecap="round" />
            {/* Wooden button on straps */}
            <circle cx="44" cy="46" r="2.8" fill="#F3EFEA" stroke="#2D312E" strokeWidth="1.5" />
            <circle cx="76" cy="46" r="2.8" fill="#F3EFEA" stroke="#2D312E" strokeWidth="1.5" />
            {/* Overalls bib & body */}
            <path
              d="M36 48 L84 48 L88 78 L88 120 L66 120 L64 88 L56 88 L54 120 L32 120 L32 78 Z"
              fill={accentColor}
              stroke="#2D312E"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Chest kangaroo pocket */}
            <rect x="46" y="58" width="28" height="18" rx="2" fill="#FAFAF7" fillOpacity="0.3" stroke="#2D312E" strokeWidth="1.5" />
            <path d="M52 62 L68 62" stroke="#2D312E" strokeWidth="1.5" strokeDasharray="2 2" />
            {/* Turn up cuffs */}
            <rect x="32" y="112" width="22" height="8" fill="#FAFAF7" fillOpacity="0.4" stroke="#2D312E" strokeWidth="1" />
            <rect x="66" y="112" width="22" height="8" fill="#FAFAF7" fillOpacity="0.4" stroke="#2D312E" strokeWidth="1" />
          </svg>
        )}

        {silhouetteType === 'sweater' && (
          <svg
            className={isLarge ? 'w-48 h-56' : 'w-32 h-40'}
            viewBox="0 0 120 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Chunky Cardigan / Sweater */}
            <path
              d="M40 22 C48 26, 72 26, 80 22 L112 42 L98 62 L84 52 L84 112 L36 112 L36 52 L22 62 L8 42 Z"
              fill={accentColor}
              stroke="#2D312E"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Rib neck */}
            <path d="M42 24 C50 30, 70 30, 78 24" stroke="#2D312E" strokeWidth="2" />
            {/* Center button placket */}
            <path d="M60 30 L60 110" stroke="#2D312E" strokeWidth="2" strokeDasharray="3 3" />
            {/* 3 Coconut buttons */}
            <circle cx="60" cy="46" r="3" fill="#F3EFEA" stroke="#2D312E" strokeWidth="1.5" />
            <circle cx="60" cy="68" r="3" fill="#F3EFEA" stroke="#2D312E" strokeWidth="1.5" />
            <circle cx="60" cy="90" r="3" fill="#F3EFEA" stroke="#2D312E" strokeWidth="1.5" />
            {/* Knit stitch texture marks */}
            <path d="M44 70 L48 66 L52 70" stroke="#FAFAF7" strokeWidth="1.5" strokeOpacity="0.7" />
            <path d="M68 70 L72 66 L76 70" stroke="#FAFAF7" strokeWidth="1.5" strokeOpacity="0.7" />
          </svg>
        )}

        {silhouetteType === 'pants' && (
          <svg
            className={isLarge ? 'w-48 h-56' : 'w-32 h-40'}
            viewBox="0 0 120 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Gathered bloomer / harem pants */}
            <path
              d="M32 38 L88 38 L96 86 L80 118 L64 118 L60 84 L56 84 L52 118 L36 118 L24 86 Z"
              fill={accentColor}
              stroke="#2D312E"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Elastic waistband with drawstrings */}
            <path d="M32 38 L88 38" stroke="#2D312E" strokeWidth="4" strokeDasharray="3 2" />
            <path d="M60 40 Q55 52 50 56" stroke="#2D312E" strokeWidth="2" strokeLinecap="round" />
            <path d="M60 40 Q65 52 70 56" stroke="#2D312E" strokeWidth="2" strokeLinecap="round" />
            {/* Ankle cuffs */}
            <path d="M36 114 L52 114" stroke="#2D312E" strokeWidth="3" />
            <path d="M64 114 L80 114" stroke="#2D312E" strokeWidth="3" />
          </svg>
        )}

        {silhouetteType === 'set' && (
          <svg
            className={isLarge ? 'w-48 h-56' : 'w-32 h-40'}
            viewBox="0 0 120 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top Shirt */}
            <path
              d="M40 20 L80 20 L100 36 L88 48 L78 40 L78 72 L42 72 L42 40 L32 48 L20 36 Z"
              fill="#FAFAF7"
              stroke="#2D312E"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Mao collar */}
            <path d="M50 20 L60 28 L70 20" stroke="#2D312E" strokeWidth="2" />
            <circle cx="60" cy="40" r="2" fill="#2D312E" />
            <circle cx="60" cy="54" r="2" fill="#2D312E" />
            {/* Shorts */}
            <path
              d="M40 76 L80 76 L86 112 L68 112 L62 90 L58 90 L52 112 L34 112 Z"
              fill={accentColor}
              stroke="#2D312E"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path d="M42 84 L50 84" stroke="#FAFAF7" strokeWidth="2" />
          </svg>
        )}

        {silhouetteType === 'shoes' && (
          <svg
            className={isLarge ? 'w-48 h-56' : 'w-32 h-40'}
            viewBox="0 0 120 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Left moccasin */}
            <path
              d="M22 66 C22 52, 54 52, 54 66 L56 94 C56 104, 46 108, 38 108 C30 108, 20 104, 20 94 Z"
              fill={accentColor}
              stroke="#2D312E"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Tongue & fringing */}
            <ellipse cx="38" cy="74" rx="12" ry="7" fill="#F3EFEA" stroke="#2D312E" strokeWidth="1.5" />
            <path d="M28 72 L48 72" stroke="#2D312E" strokeWidth="1" strokeDasharray="2 2" />

            {/* Right moccasin */}
            <path
              d="M66 66 C66 52, 98 52, 98 66 L100 94 C100 104, 90 108, 82 108 C74 108, 64 104, 64 94 Z"
              fill={accentColor}
              stroke="#2D312E"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <ellipse cx="82" cy="74" rx="12" ry="7" fill="#F3EFEA" stroke="#2D312E" strokeWidth="1.5" />
            <path d="M72 72 L92 72" stroke="#2D312E" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        )}

        <div className="mt-2 flex items-center gap-1.5 opacity-80">
          {colors.slice(0, 3).map((c, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full border border-[#2D312E]/30"
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* Subtle bottom badge for natural fabric */}
      <div className="absolute bottom-2 left-3 text-[11px] font-medium tracking-tight text-[#2D312E]/70 flex items-center gap-1">
        <span>Fibras 100% nobles</span>
      </div>
    </div>
  );
};
