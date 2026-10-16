import React from 'react';
import { ContactInquiry, CookiePreferences } from '../types';
import { X, Database, RefreshCw, Trash2, CheckCircle2 } from 'lucide-react';

interface KodarviaInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: ContactInquiry[];
  cookies: CookiePreferences | null;
  wishlistCount: number;
  onResetMockData: () => void;
  onClearAllData: () => void;
}

export const KodarviaInspectionModal: React.FC<KodarviaInspectionModalProps> = ({
  isOpen,
  onClose,
  inquiries,
  cookies,
  wishlistCount,
  onResetMockData,
  onClearAllData,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="kodarvia-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#2D312E]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
    >
      <div
        className="w-full max-w-2xl bg-[#FAFAF7] rounded-2xl border border-[#2D312E]/10 shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2D312E]/10 pb-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#D97D64]" />
            <div>
              <h2 id="kodarvia-modal-title" className="text-base font-bold text-[#2D312E] font-display">
                Panel de Auditoría Kodarvia · LocalStorage
              </h2>
              <p className="text-xs text-[#2D312E]/70">
                Visualizá y gestioná el estado simulado en el cliente para revisión técnica.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar panel de auditoría"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#2D312E]/60 hover:text-[#2D312E]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick actions for reviewer */}
        <div className="bg-[#F3EFEA] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-[#2D312E] block">
              Control de Datos de Ejemplo
            </span>
            <span className="text-[11px] text-[#2D312E]/70">
              Restablecé o limpiá los registros de prueba en cualquier momento.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetMockData}
              className="py-2 px-3 text-xs font-semibold bg-[#8FA89B] hover:bg-[#7b9789] text-white rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restablecer datos de ejemplo</span>
            </button>

            <button
              type="button"
              onClick={onClearAllData}
              className="py-2 px-3 text-xs font-semibold bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpiar todo</span>
            </button>
          </div>
        </div>

        {/* Inquiries in LocalStorage */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D312E] flex items-center gap-1.5">
              <span>Consultas Guardadas (pl_inquiries):</span>
              <span className="text-[#D97D64] tabular-nums">({inquiries.length})</span>
            </h3>
            <span className="text-[11px] text-[#2D312E]/60">Sin backend externo</span>
          </div>

          {inquiries.length === 0 ? (
            <p className="text-xs text-[#2D312E]/60 p-4 bg-white rounded-xl border border-[#2D312E]/10 text-center">
              No hay consultas registradas actualmente. Enviá un mensaje desde el formulario o el botón de WhatsApp.
            </p>
          ) : (
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-white p-3.5 rounded-xl border border-[#2D312E]/10 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <strong className="text-[#2D312E]">{inq.name}</strong>
                    <span className="text-[10px] text-[#2D312E]/50 tabular-nums">
                      {new Date(inq.createdAt).toLocaleString('es-EC')}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#2D312E]/70 flex flex-wrap gap-x-3 gap-y-0.5">
                    <span>Email: {inq.email}</span>
                    <span>Cel: {inq.phone}</span>
                    <span>Canal: <strong className="text-[#8FA89B]">{inq.channel}</strong></span>
                  </div>
                  {inq.interestedProduct && (
                    <div className="text-[11px] text-[#D97D64] font-medium">
                      Interés: {inq.interestedProduct} {inq.interestedSize ? `(${inq.interestedSize})` : ''}
                    </div>
                  )}
                  <p className="text-[11px] text-[#2D312E]/85 bg-[#F3EFEA] p-2 rounded-md">
                    "{inq.message}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cookies & Wishlist info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-white rounded-xl border border-[#2D312E]/10 space-y-1.5">
            <h4 className="font-bold text-[#2D312E]">Preferencia de Cookies (pl_cookie_consent)</h4>
            {cookies ? (
              <div className="space-y-1 text-[#2D312E]/80 text-[11px]">
                <p>• Aceptado general: <strong className="text-[#8FA89B]">{cookies.accepted ? 'SÍ' : 'NO'}</strong></p>
                <p>• Analíticas: {cookies.analytics ? 'Habilitadas' : 'Deshabilitadas'}</p>
                <p>• Preferencias: {cookies.preferences ? 'Habilitadas' : 'Deshabilitadas'}</p>
                <p>• Última actualización: {new Date(cookies.updatedAt).toLocaleDateString()}</p>
              </div>
            ) : (
              <p className="text-[11px] text-[#2D312E]/60">Sin preferencia guardada aún (se mostrará el banner).</p>
            )}
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#2D312E]/10 space-y-1.5">
            <h4 className="font-bold text-[#2D312E]">Lista de Consulta (pl_wishlist)</h4>
            <p className="text-[11px] text-[#2D312E]/80">
              {wishlistCount} artículos actualmente seleccionados en la sesión.
            </p>
            <div className="flex items-center gap-1 text-[11px] text-[#8FA89B] mt-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Persistencia lista para integración backend Kodarvia</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-[#2D312E]/10 flex justify-between items-center text-[11px] text-[#2D312E]/60">
          <span>Kodarvia QA · Entrega Pequeña Luna</span>
          <button
            type="button"
            onClick={onClose}
            className="py-1.5 px-3 bg-[#2D312E] text-white rounded-md text-xs font-semibold"
          >
            Cerrar panel
          </button>
        </div>
      </div>
    </div>
  );
};
