import React, { useState, useEffect } from 'react';
import { CookiePreferences } from '../types';
import { ShieldCheck, Settings, Check, X } from 'lucide-react';

interface CookieBannerProps {
  onOpenSettings?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [preferencesConsent, setPreferencesConsent] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pl_cookie_consent');
      if (!stored) {
        // Show after subtle delay
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const savePreferences = (accepted: boolean, analytics: boolean, preferences: boolean) => {
    const pref: CookiePreferences = {
      accepted,
      analytics,
      preferences,
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem('pl_cookie_consent', JSON.stringify(pref));
    } catch (e) {
      console.warn('LocalStorage error saving cookies', e);
    }
    setIsVisible(false);
    setShowConfigModal(false);
  };

  if (!isVisible && !showConfigModal) return null;

  return (
    <>
      {/* Non-intrusive bottom banner */}
      {isVisible && !showConfigModal && (
        <aside
          role="region"
          aria-label="Aviso de cookies y privacidad"
          className="fixed bottom-3 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-lg z-50 bg-[#FAFAF7] border border-[#2D312E]/15 rounded-2xl p-4 sm:p-5 shadow-xl animate-in slide-in-from-bottom duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#8FA89B]/20 text-[#8FA89B] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>

            <div className="flex-1 space-y-2">
              <h3 className="text-sm font-bold text-[#2D312E] font-display">
                Tu privacidad en Pequeña Luna
              </h3>
              <p className="text-xs text-[#2D312E]/80 leading-relaxed">
                Utilizamos cookies funcionales y almacenamiento local en tu navegador para recordar tu lista de consulta y ofrecerte una experiencia cálida sin recopilar datos personales sin tu consentimiento.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => savePreferences(true, true, true)}
                  className="py-2 px-3.5 bg-[#2D312E] hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                >
                  Aceptar todas
                </button>

                <button
                  type="button"
                  onClick={() => savePreferences(false, false, false)}
                  className="py-2 px-3 bg-[#F3EFEA] hover:bg-[#EAE4DC] text-[#2D312E] text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                >
                  Rechazar no esenciales
                </button>

                <button
                  type="button"
                  onClick={() => setShowConfigModal(true)}
                  className="py-2 px-2.5 text-xs text-[#2D312E]/70 hover:text-[#2D312E] underline flex items-center gap-1"
                >
                  <Settings className="w-3 h-3" />
                  <span>Configurar</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Configuration Modal */}
      {showConfigModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-config-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-[#2D312E]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            className="w-full max-w-md bg-[#FAFAF7] rounded-2xl border border-[#2D312E]/10 shadow-2xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#2D312E]/10 pb-3">
              <h3 id="cookie-config-title" className="text-base font-bold text-[#2D312E] font-display">
                Configuración de Privacidad
              </h3>
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#2D312E]/60 hover:text-[#2D312E]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#2D312E]/85">
              {/* Necessary cookies */}
              <div className="p-3 bg-[#F3EFEA] rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-[#2D312E]">Cookies Técnicas y Esenciales</h4>
                  <p className="text-[11px] text-[#2D312E]/70 mt-0.5">
                    Permiten recordar tu lista de consulta y la navegación básica.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#8FA89B] uppercase">Siempre activas</span>
              </div>

              {/* Preference cookies */}
              <div className="p-3 bg-white border border-[#2D312E]/10 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-[#2D312E]">Preferencia de Talles y Filtros</h4>
                  <p className="text-[11px] text-[#2D312E]/70 mt-0.5">
                    Guarda tus categorías preferidas para futuras visitas.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferencesConsent}
                  onChange={(e) => setPreferencesConsent(e.target.checked)}
                  className="w-4 h-4 accent-[#D97D64]"
                />
              </div>

              {/* Analytics cookies */}
              <div className="p-3 bg-white border border-[#2D312E]/10 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-[#2D312E]">Métricas de Navegación Anónimas</h4>
                  <p className="text-[11px] text-[#2D312E]/70 mt-0.5">
                    Nos ayuda a mejorar la presentación de las colecciones.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsConsent}
                  onChange={(e) => setAnalyticsConsent(e.target.checked)}
                  className="w-4 h-4 accent-[#D97D64]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => savePreferences(true, analyticsConsent, preferencesConsent)}
                className="py-2.5 px-4 bg-[#D97D64] hover:bg-[#c96c53] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Guardar mis preferencias</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
