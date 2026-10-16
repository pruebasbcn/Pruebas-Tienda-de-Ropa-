import React, { useState } from 'react';
import { STORE_INFO } from '../data/mockData';
import { ContactInquiry } from '../types';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Truck,
  CheckCircle2,
  AlertCircle,
  Send,
  MessageCircle,
} from 'lucide-react';

interface ContactSectionProps {
  onSaveInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => void;
  prefilledProduct?: string;
  prefilledSize?: string;
  onOpenGeneralWhatsApp: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onSaveInquiry,
  prefilledProduct = '',
  prefilledSize = '',
  onOpenGeneralWhatsApp,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Quito');
  const [subject, setSubject] = useState(
    prefilledProduct ? `Consulta sobre ${prefilledProduct}` : 'Consulta de Colección y Talles'
  );
  const [message, setMessage] = useState(
    prefilledProduct
      ? `Hola equipo de Pequeña Luna, me interesa consultar disponibilidad para ${prefilledProduct}${
          prefilledSize ? ` en talle ${prefilledSize}` : ''
        }. Quisiera saber los tiempos de entrega y métodos de pago.`
      : ''
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Por favor ingresá tu nombre completo.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Ingresá un formato de correo válido (ej. nombre@correo.com).';
    }

    // Phone validation (accepts Ecuador format 09... or +593 or standard phone digits)
    const phoneClean = phone.replace(/[\s-]/g, '');
    if (!phone.trim()) {
      newErrors.phone = 'El número de celular o WhatsApp es obligatorio.';
    } else if (phoneClean.length < 8) {
      newErrors.phone = 'Ingresá un número de teléfono válido (mínimo 8 dígitos).';
    }

    // Message validation
    if (!message.trim()) {
      newErrors.message = 'Por favor redactá tu consulta.';
    } else if (message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const refCode = `PL-EC-${Date.now().toString().slice(-6)}`;

    onSaveInquiry({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city,
      subject,
      message: message.trim(),
      interestedProduct: prefilledProduct || undefined,
      interestedSize: prefilledSize || undefined,
      channel: 'formulario',
    });

    setSubmittedId(refCode);
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setErrors({});
    setSubmittedId(null);
  };

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-[#FAFAF7] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#D97D64] block mb-2">
            Atención Cercana & Showroom
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D312E] font-display">
            Estamos para acompañarte
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#2D312E]/75 leading-relaxed">
            Escribinos tu consulta sobre talles, confección a medida o regalos especiales. Te responderemos a la brevedad con la calidez que tu familia merece.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Showroom info, Map, Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F3EFEA] rounded-2xl p-6 sm:p-7 border border-[#2D312E]/10 space-y-6">
              <h3 className="text-lg font-bold text-[#2D312E] font-display">
                Showroom Pequeña Luna · Cumbayá
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#2D312E]/85">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 text-[#D97D64] shadow-2xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#2D312E] font-semibold">Ubicación física:</strong>
                    <span>{STORE_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 text-[#8FA89B] shadow-2xs">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#2D312E] font-semibold">Horario de atención:</strong>
                    <span>{STORE_INFO.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 text-[#2D312E] shadow-2xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#2D312E] font-semibold">Línea directa Ecuador:</strong>
                    <span>{STORE_INFO.phoneDisplay}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 text-[#8FA89B] shadow-2xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#2D312E] font-semibold">Correo de contacto:</strong>
                    <span>{STORE_INFO.email}</span>
                  </div>
                </div>
              </div>

              {/* Delivery info box */}
              <div className="bg-[#FAFAF7] rounded-xl p-4 border border-[#2D312E]/10 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8FA89B]">
                  <Truck className="w-4 h-4" />
                  <span>Logística nacional garantizada</span>
                </div>
                <p className="text-xs text-[#2D312E]/75 leading-relaxed">
                  {STORE_INFO.shippingInfo}
                </p>
              </div>

              {/* Fast WhatsApp Callout */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenGeneralWhatsApp}
                  className="w-full py-3 px-4 bg-[#8FA89B] hover:bg-[#7a9587] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors min-h-[46px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar por WhatsApp ahora</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Validated Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#2D312E]/10 shadow-sm">
              {submittedId ? (
                <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#8FA89B]/20 text-[#8FA89B] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-bold text-[#2D312E] font-display">
                    ¡Gracias por comunicarte con Pequeña Luna!
                  </h3>

                  <p className="text-sm text-[#2D312E]/80 max-w-md mx-auto leading-relaxed">
                    Hemos registrado tu mensaje en el sistema local. Nuestro equipo de asesoría te responderá al correo o celular indicado.
                  </p>

                  <div className="bg-[#F3EFEA] rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[#2D312E]/70">Código de Radicado:</span>
                      <strong className="text-[#D97D64] font-mono">{submittedId}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#2D312E]/70">Contacto registrado:</span>
                      <span className="font-medium text-[#2D312E]">{name} ({email})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#2D312E]/70">Estado:</span>
                      <span className="text-[#8FA89B] font-semibold">Guardado en localStorage</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="py-2.5 px-5 text-xs font-semibold bg-[#2D312E] text-white rounded-lg hover:bg-black transition-colors"
                    >
                      Enviar otra consulta
                    </button>
                    <button
                      type="button"
                      onClick={onOpenGeneralWhatsApp}
                      className="py-2.5 px-5 text-xs font-semibold bg-[#F3EFEA] text-[#2D312E] rounded-lg hover:bg-[#EAE4DC] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#8FA89B]" />
                      <span>Escribir por WhatsApp</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="border-b border-[#2D312E]/10 pb-3 mb-4">
                    <h3 className="text-lg font-bold text-[#2D312E] font-display">
                      Formulario de Consulta Directa
                    </h3>
                    <p className="text-xs text-[#2D312E]/70 mt-1">
                      Completá tus datos para recibir asesoramiento personalizado.
                    </p>
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-[#2D312E] mb-1">
                      Nombre completo <span className="text-[#D97D64]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Ej. María Elena Maldonado"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-lg border bg-[#FAFAF7] focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#2D312E]/20 focus:border-[#D97D64] focus:bg-white'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-[#2D312E] mb-1">
                        Correo electrónico <span className="text-[#D97D64]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="tu@correo.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        className={`w-full text-xs px-3.5 py-2.5 rounded-lg border bg-[#FAFAF7] focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-[#2D312E]/20 focus:border-[#D97D64] focus:bg-white'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#2D312E] mb-1">
                        Celular / WhatsApp <span className="text-[#D97D64]">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="099 123 4567 o +593..."
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                        }}
                        className={`w-full text-xs px-3.5 py-2.5 rounded-lg border bg-[#FAFAF7] focus:outline-none transition-colors ${
                          errors.phone
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-[#2D312E]/20 focus:border-[#D97D64] focus:bg-white'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* City selector in Ecuador & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-city" className="block text-xs font-semibold text-[#2D312E] mb-1">
                        Ciudad en Ecuador
                      </label>
                      <select
                        id="contact-city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#2D312E]/20 bg-[#FAFAF7] focus:outline-none focus:border-[#D97D64]"
                      >
                        <option value="Quito / Cumbayá">Quito / Cumbayá / Valles</option>
                        <option value="Guayaquil / Samborondón">Guayaquil / Samborondón</option>
                        <option value="Cuenca">Cuenca</option>
                        <option value="Ambato">Ambato</option>
                        <option value="Manta / Portoviejo">Manta / Portoviejo</option>
                        <option value="Loja">Loja</option>
                        <option value="Otra ciudad del Ecuador">Otra ciudad del Ecuador</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#2D312E] mb-1">
                        Motivo de consulta
                      </label>
                      <select
                        id="contact-subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#2D312E]/20 bg-[#FAFAF7] focus:outline-none focus:border-[#D97D64]"
                      >
                        <option value="Consulta de Colección y Talles">Consulta de Colección y Talles</option>
                        <option value="Disponibilidad de Prenda Específica">Disponibilidad de Prenda Específica</option>
                        <option value="Regalo de Baby Shower / Valija Maternal">Regalo de Baby Shower / Valija Maternal</option>
                        <option value="Visita al Showroom Cumbayá">Visita al Showroom Cumbayá</option>
                        <option value="Envíos y Medios de Pago">Envíos y Medios de Pago</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-[#2D312E] mb-1">
                      Mensaje obligatorio <span className="text-[#D97D64]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Detallanos qué prenda o talle te interesa, si es para recién nacido o niño, o cualquier indicación de envío..."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                      }}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-lg border bg-[#FAFAF7] focus:outline-none resize-none transition-colors ${
                        errors.message
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#2D312E]/20 focus:border-[#D97D64] focus:bg-white'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 bg-[#D97D64] hover:bg-[#c96c53] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm min-h-[48px]"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar consulta a Pequeña Luna</span>
                    </button>
                    <p className="text-[11px] text-center text-[#2D312E]/60 mt-2">
                      Sin cobro online: tus datos se guardan en el navegador para canalizar la consulta.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
