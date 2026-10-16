import React from 'react';
import { TEAM_MEMBERS, STORE_INFO } from '../data/mockData';
import { Heart, Sparkles, ShieldCheck, Feather } from 'lucide-react';

interface AboutSectionProps {
  onOpenShowroomMap?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <section id="nosotros" className="py-16 sm:py-24 bg-[#F3EFEA] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8FA89B] block mb-2">
            Nuestra Historia & Confección
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D312E] font-display">
            Prendas nobles que abrazan la infancia
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#2D312E]/75 leading-relaxed">
            Pequeña Luna nació en Cumbayá con una certeza: la piel de los más chiquitos necesita fibras puras, holgura para descubrir el mundo y diseños libres de artificios.
          </p>
        </div>

        {/* Narrative & Craftsmanship Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Story Text Box */}
          <div className="lg:col-span-7 bg-[#FAFAF7] rounded-2xl p-6 sm:p-10 border border-[#2D312E]/10 space-y-5">
            <h3 className="text-xl sm:text-2xl font-bold text-[#2D312E] font-display">
              El valor de lo simple y duradero
            </h3>

            <p className="text-xs sm:text-sm text-[#2D312E]/80 leading-relaxed">
              Comenzamos en un pequeño taller familiar confeccionando las primeras mudas para nuestros propios hijos. Nos frustraba encontrar en el mercado prendas infantiles con costuras rígidas, botones plásticos molestos y sintéticos que causaban enrojecimiento con el clima templado o variable del Ecuador.
            </p>

            <p className="text-xs sm:text-sm text-[#2D312E]/80 leading-relaxed">
              Decidimos entonces buscar el <strong>algodón pima orgánico de fibra extra larga</strong> y el <strong>lino prelavado</strong>. Diseñamos cada enterito, jardinero y cardigan pensando en la practicidad para los padres y el confort absoluto del bebé, garantizando que cada pieza pueda heredarse entre hermanos o primos en perfecto estado.
            </p>

            {/* 3 Pillars */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#F3EFEA] rounded-xl space-y-1">
                <Feather className="w-4 h-4 text-[#D97D64]" />
                <h4 className="text-xs font-bold text-[#2D312E] font-display">Tacto Incomparable</h4>
                <p className="text-[11px] text-[#2D312E]/70 leading-normal">
                  Fibras naturales peinadas que ganan suavidad con cada lavado.
                </p>
              </div>

              <div className="p-3 bg-[#F3EFEA] rounded-xl space-y-1">
                <ShieldCheck className="w-4 h-4 text-[#8FA89B]" />
                <h4 className="text-xs font-bold text-[#2D312E] font-display">Confección Segura</h4>
                <p className="text-[11px] text-[#2D312E]/70 leading-normal">
                  Cierres libres de níquel, broches de madera y tintes no tóxicos.
                </p>
              </div>

              <div className="p-3 bg-[#F3EFEA] rounded-xl space-y-1">
                <Heart className="w-4 h-4 text-[#D97D64]" />
                <h4 className="text-xs font-bold text-[#2D312E] font-display">Taller Local</h4>
                <p className="text-[11px] text-[#2D312E]/70 leading-normal">
                  Hecho con esmero en Ecuador por artesanas especializadas.
                </p>
              </div>
            </div>
          </div>

          {/* Showroom Vignette / Atmospheric Graphic Box */}
          <div className="lg:col-span-5 bg-[#2D312E] text-[#FAFAF7] rounded-2xl p-7 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#8FA89B]/10 rounded-full blur-2xl" />
            <div className="relative z-10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#8FA89B]/20 text-[#8FA89B] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>

              <h4 className="text-xl font-bold font-display text-white">
                Nuestro Showroom en Cumbayá
              </h4>

              <p className="text-xs sm:text-sm text-[#FAFAF7]/80 leading-relaxed">
                Un espacio luminoso y relajado donde podés tocar cada tejido, comprobar las caídas de las telas y probar los talles sin apuro.
              </p>

              <div className="pt-2 border-t border-white/10 space-y-2 text-xs text-[#FAFAF7]/70">
                <p>📍 {STORE_INFO.address}</p>
                <p>🕒 {STORE_INFO.hours}</p>
                <p>✨ Estacionamiento privado y rincón de juegos infantiles.</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Team */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D97D64] block mb-1">
              Las personas detrás del proyecto
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#2D312E] font-display">
              Equipo Pequeña Luna
            </h3>
            <p className="text-xs sm:text-sm text-[#2D312E]/70 mt-2">
              Un grupo comprometido con el diseño consciente, la calidad artesanal y la atención afectuosa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#FAFAF7] rounded-2xl p-6 border border-[#2D312E]/10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 hover:shadow-xs"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#8FA89B]/20 text-[#2D312E] font-bold font-display flex items-center justify-center text-base mb-4">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>

                  <h4 className="text-base font-bold text-[#2D312E] font-display">
                    {member.name}
                  </h4>

                  <span className="text-xs font-semibold text-[#D97D64] block mt-0.5 mb-3">
                    {member.role}
                  </span>

                  <p className="text-xs text-[#2D312E]/80 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#2D312E]/10">
                  <span className="text-[11px] text-[#2D312E]/60 block font-normal">Foco de trabajo:</span>
                  <span className="text-xs font-medium text-[#2D312E]/90">{member.focus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
