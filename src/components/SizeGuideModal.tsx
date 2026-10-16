import React, { useState } from 'react';
import { SIZE_CHART_BABY, SIZE_CHART_KIDS } from '../data/mockData';
import { X, Ruler, HelpCircle, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConsultWhatsApp: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  onConsultWhatsApp,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'baby' | 'kids'>('baby');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#2D312E]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-[#FAFAF7] rounded-2xl border border-[#2D312E]/10 shadow-2xl overflow-hidden my-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2D312E]/10 bg-[#F3EFEA]/80">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#D97D64]" />
            <h2 id="size-guide-title" className="text-lg font-bold text-[#2D312E] font-display">
              Tabla de Medidas & Talles · Pequeña Luna
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar tabla de talles"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#2D312E]/70 hover:text-[#2D312E] hover:bg-black/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="p-5 pb-0">
          <div className="flex p-1 bg-[#F3EFEA] rounded-xl max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('baby')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'baby'
                  ? 'bg-white text-[#2D312E] shadow-xs'
                  : 'text-[#2D312E]/70 hover:text-[#2D312E]'
              }`}
            >
              Bebés & Primeros Pasos (0 a 24 Meses)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('kids')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'kids'
                  ? 'bg-white text-[#2D312E] shadow-xs'
                  : 'text-[#2D312E]/70 hover:text-[#2D312E]'
              }`}
            >
              Niñas & Niños (2 a 8 Años)
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-[#2D312E]/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F3EFEA] text-[#2D312E] font-semibold font-display border-b border-[#2D312E]/10">
                <tr>
                  <th className="py-2.5 px-3">Talle Comercial</th>
                  <th className="py-2.5 px-3">Edad Aprox.</th>
                  <th className="py-2.5 px-3">Estatura</th>
                  <th className="py-2.5 px-3">Peso Aprox.</th>
                  <th className="py-2.5 px-3">Contorno Pecho</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2D312E]/10 font-normal">
                {(activeTab === 'baby' ? SIZE_CHART_BABY : SIZE_CHART_KIDS).map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F3EFEA]/40 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-[#2D312E]">{row.size}</td>
                    <td className="py-2.5 px-3 text-[#2D312E]/80">{row.ageMonths}</td>
                    <td className="py-2.5 px-3 tabular-nums text-[#2D312E]/80">{row.heightCm}</td>
                    <td className="py-2.5 px-3 tabular-nums text-[#2D312E]/80">{row.weightKg}</td>
                    <td className="py-2.5 px-3 tabular-nums text-[#2D312E]/80">{row.chestCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Advice card */}
          <div className="bg-[#FAFAF7] border border-[#8FA89B]/40 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 text-[#8FA89B] font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>La regla de oro de Pequeña Luna: holgura y bienestar</span>
            </div>
            <p className="text-[#2D312E]/80 leading-relaxed">
              Nuestras prendas de algodón pima y lino tienen un calce natural relajado. Si tu bebé o niño se encuentra en el límite de un rango, <strong>recomendamos elegir siempre el talle superior</strong>. Así le darás libertad de movimiento para gatear o jugar, y la prenda acompañará su crecimiento por mucho más tiempo.
            </p>
          </div>

          {/* How to measure */}
          <div className="bg-[#F3EFEA]/70 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 text-[#2D312E] font-semibold">
              <HelpCircle className="w-4 h-4 text-[#D97D64]" />
              <span>¿Cómo medir en casa sin incomodarlo?</span>
            </div>
            <ul className="space-y-1 text-[#2D312E]/75 leading-relaxed">
              <li>• <strong>Estatura:</strong> Acostá al bebé estirado sobre una manta suave y medí desde la coronilla hasta el talón.</li>
              <li>• <strong>Pecho:</strong> Pasá la cinta métrica por debajo de las axilas sobre la parte más ancha del torso sin presionar.</li>
              <li>• <strong>Peso:</strong> El peso suele ser el indicador más certero para enteritos y mamelucos de los primeros 12 meses.</li>
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-5 py-3 border-t border-[#2D312E]/10 bg-[#F3EFEA]/50 flex items-center justify-between gap-3">
          <span className="text-xs text-[#2D312E]/70 hidden sm:inline">
            ¿Tenés dudas particulares? Escribinos y te asesoramos al instante.
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onConsultWhatsApp();
            }}
            className="w-full sm:w-auto py-2.5 px-4 bg-[#8FA89B] hover:bg-[#7b9789] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Consultar talle personalizado por WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
