import React, { useState, useEffect, useCallback } from 'react';
import { Product, ContactInquiry, CookiePreferences } from './types';
import { PRODUCTS, STORE_INFO } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ProductModal } from './components/ProductModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { WhatsAppSimulatorModal } from './components/WhatsAppSimulatorModal';
import { InquiryDrawer } from './components/InquiryDrawer';
import { CookieBanner } from './components/CookieBanner';
import { KodarviaInspectionModal } from './components/KodarviaInspectionModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

// Default realistic sample inquiries for demo understanding out of the box
const DEFAULT_SAMPLE_INQUIRIES: ContactInquiry[] = [
  {
    id: 'PL-EC-109281',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    name: 'Carolina Velasco',
    email: 'carolina.velasco@gmail.com',
    phone: '099 874 1234',
    city: 'Quito / Cumbayá',
    subject: 'Disponibilidad de Prenda Específica',
    message: '¡Hola! Quisiera saber si tienen disponible el Enterito Pima en talle 3-6M para retirar hoy mismo en el showroom de Cumbayá.',
    interestedProduct: 'Enterito Pima Selva Serena',
    interestedSize: '3-6M',
    channel: 'formulario',
    status: 'nueva',
  },
  {
    id: 'PL-EC-109240',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    name: 'Doménica Andrade',
    email: 'dandrade.ec@outlook.com',
    phone: '098 332 5566',
    city: 'Guayaquil / Samborondón',
    subject: 'Regalo de Baby Shower / Valija Maternal',
    message: 'Hola Sofía, buscaba armar un set de bienvenida con el Cardigan Cumbayá y zapatitos para enviar a Samborondón. ¿En cuánto tiempo llega por Servientrega?',
    interestedProduct: 'Cardigan Tejido Cumbayá',
    interestedSize: '6-12M',
    channel: 'whatsapp_simulado',
    status: 'atendida',
  },
];

export default function App() {
  // Modal & Drawer states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isInquiryDrawerOpen, setIsInquiryDrawerOpen] = useState(false);
  const [isKodarviaModalOpen, setIsKodarviaModalOpen] = useState(false);

  // WhatsApp contextual target
  const [whatsAppProductTarget, setWhatsAppProductTarget] = useState<Product | null>(null);
  const [whatsAppSelectedSize, setWhatsAppSelectedSize] = useState<string | undefined>(undefined);

  // Contact form pre-fill
  const [prefilledContactProduct, setPrefilledContactProduct] = useState('');
  const [prefilledContactSize, setPrefilledContactSize] = useState('');

  // Wishlist / Selected Items (persisted in localStorage)
  const [wishlist, setWishlist] = useState<{ product: Product; selectedSize: string }[]>(() => {
    try {
      const stored = localStorage.getItem('pl_wishlist');
      if (stored) return JSON.parse(stored);
      // Preload 1 starter item for instant demo clarity
      return [{ product: PRODUCTS[0], selectedSize: '3-6M' }];
    } catch {
      return [{ product: PRODUCTS[0], selectedSize: '3-6M' }];
    }
  });

  // Inquiries (persisted in localStorage)
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const stored = localStorage.getItem('pl_inquiries');
      if (stored) return JSON.parse(stored);
      // Preload realistic samples
      localStorage.setItem('pl_inquiries', JSON.stringify(DEFAULT_SAMPLE_INQUIRIES));
      return DEFAULT_SAMPLE_INQUIRIES;
    } catch {
      return DEFAULT_SAMPLE_INQUIRIES;
    }
  });

  // Cookie preferences
  const [cookieConsent, setCookieConsent] = useState<CookiePreferences | null>(() => {
    try {
      const stored = localStorage.getItem('pl_cookie_consent');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Persist Wishlist whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('pl_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage save error for wishlist', e);
    }
  }, [wishlist]);

  // Dynamic Page Title management
  useEffect(() => {
    if (selectedProduct && isProductModalOpen) {
      document.title = `${selectedProduct.name} | Pequeña Luna · Ropa Infantil Ecuador`;
    } else {
      document.title = 'Pequeña Luna · Ropa Infantil Ecuador | Catálogo & Tienda';
    }
  }, [selectedProduct, isProductModalOpen]);

  // Wishlist set of IDs for quick check
  const wishlistIds = new Set(wishlist.map((item) => item.product.id));

  // Toggle wishlist
  const handleToggleWishlist = useCallback((product: Product, selectedSize?: string) => {
    const sizeToUse = selectedSize || product.sizes[0];
    setWishlist((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);
      if (exists) {
        return prev.filter((item) => item.product.id !== product.id);
      } else {
        return [...prev, { product, selectedSize: sizeToUse }];
      }
    });
  }, []);

  const handleRemoveWishlistItem = useCallback((productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const handleClearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  // Open modals
  const handleOpenProductModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  }, []);

  const handleOpenProductWhatsApp = useCallback((product: Product, size?: string) => {
    setWhatsAppProductTarget(product);
    setWhatsAppSelectedSize(size || product.sizes[0]);
    setIsWhatsAppOpen(true);
  }, []);

  const handleOpenGeneralWhatsApp = useCallback(() => {
    setWhatsAppProductTarget(null);
    setWhatsAppSelectedSize(undefined);
    setIsWhatsAppOpen(true);
  }, []);

  // Save new inquiry into state & localStorage
  const handleSaveContactInquiry = useCallback(
    (inquiryData: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => {
      const newInquiry: ContactInquiry = {
        ...inquiryData,
        id: `PL-EC-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toISOString(),
        status: 'nueva',
      };
      setInquiries((prev) => {
        const updated = [newInquiry, ...prev];
        try {
          localStorage.setItem('pl_inquiries', JSON.stringify(updated));
        } catch (e) {
          console.warn('LocalStorage error saving inquiry', e);
        }
        return updated;
      });
    },
    []
  );

  const handleSaveWhatsAppInquiry = useCallback(
    (data: {
      name: string;
      phone: string;
      message: string;
      productName: string;
      productSize: string;
    }) => {
      handleSaveContactInquiry({
        name: data.name,
        email: 'consulta-whatsapp@cliente.ec',
        phone: data.phone,
        city: 'Quito / Valles',
        subject: `Consulta WhatsApp por ${data.productName}`,
        message: data.message,
        interestedProduct: data.productName,
        interestedSize: data.productSize,
        channel: 'whatsapp_simulado',
      });
    },
    [handleSaveContactInquiry]
  );

  // Bulk wishlist WhatsApp inquiry
  const handleConsultBulkWhatsApp = useCallback(
    (items: { product: Product; selectedSize: string }[]) => {
      const productList = items
        .map((i) => `• ${i.product.name} (Talle: ${i.selectedSize}) - $${i.product.priceUsd.toFixed(2)} USD`)
        .join('\n');
      const total = items.reduce((acc, i) => acc + i.product.priceUsd, 0);

      const combinedProduct: Product = {
        id: 'pl-bulk-inquiry',
        name: `Consulta por ${items.length} prendas seleccionadas`,
        collection: 'combinada',
        collectionLabel: 'Selección Personalizada',
        ageCategory: 'todos',
        ageLabel: 'Varios talles',
        priceUsd: total,
        sku: 'PL-SET-CONSULTA',
        materials: 'Algodón Pima & Lino',
        colors: [{ name: 'Surtido', hex: '#8FA89B' }],
        sizes: [items.map((i) => i.selectedSize).join(', ')],
        description: productList,
        highlight: 'Consulta consolidada',
        careInstructions: [],
        inShowroom: true,
        featured: false,
        silhouetteType: 'set',
        accentColor: '#D97D64',
      };

      setWhatsAppProductTarget(combinedProduct);
      setWhatsAppSelectedSize('Talles elegidos');
      setIsWhatsAppOpen(true);
    },
    []
  );

  const handleFillContactFormFromWishlist = useCallback(
    (items: { product: Product; selectedSize: string }[]) => {
      const summary = items.map((i) => `${i.product.name} (${i.selectedSize})`).join(', ');
      setPrefilledContactProduct(summary);
      setPrefilledContactSize('');
      // Scroll to contact form
      const el = document.getElementById('contacto');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
    []
  );

  // Kodarvia QA tools: Reset mock data
  const handleResetMockData = useCallback(() => {
    try {
      localStorage.setItem('pl_inquiries', JSON.stringify(DEFAULT_SAMPLE_INQUIRIES));
      localStorage.setItem('pl_wishlist', JSON.stringify([{ product: PRODUCTS[0], selectedSize: '3-6M' }]));
      setInquiries(DEFAULT_SAMPLE_INQUIRIES);
      setWishlist([{ product: PRODUCTS[0], selectedSize: '3-6M' }]);
      alert('¡Datos de ejemplo de Pequeña Luna restablecidos con éxito en localStorage!');
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const handleClearAllData = useCallback(() => {
    try {
      localStorage.removeItem('pl_inquiries');
      localStorage.removeItem('pl_wishlist');
      localStorage.removeItem('pl_cookie_consent');
      setInquiries([]);
      setWishlist([]);
      setCookieConsent(null);
      alert('LocalStorage limpiado completamente.');
    } catch (e) {
      console.warn(e);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#2D312E]">
      {/* Top Header conforming to 3-zone contract */}
      <Navbar
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsInquiryDrawerOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenWhatsApp={handleOpenGeneralWhatsApp}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Claim-to-Proof */}
        <Hero
          onExploreCatalog={() => {
            const el = document.getElementById('catalogo');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          onOpenWhatsApp={handleOpenGeneralWhatsApp}
        />

        {/* Catalog of Reference with Live Filters & Search */}
        <CatalogSection
          onOpenProductModal={handleOpenProductModal}
          onOpenWhatsApp={handleOpenProductWhatsApp}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        />

        {/* Story, Team & Showroom Section */}
        <AboutSection />

        {/* Validated Contact Form & Showroom Details */}
        <ContactSection
          onSaveInquiry={handleSaveContactInquiry}
          prefilledProduct={prefilledContactProduct}
          prefilledSize={prefilledContactSize}
          onOpenGeneralWhatsApp={handleOpenGeneralWhatsApp}
        />
      </main>

      {/* Institutional Footer */}
      <Footer
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenKodarviaPanel={() => setIsKodarviaModalOpen(true)}
        onResetMockData={handleResetMockData}
        onOpenCookies={() => {
          localStorage.removeItem('pl_cookie_consent');
          window.location.reload();
        }}
      />

      {/* Mobile Ergonomic Bottom Nav (15% sticky cap compliant) */}
      <MobileBottomNav
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsInquiryDrawerOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenWhatsApp={handleOpenGeneralWhatsApp}
      />

      {/* Product Details & Technical Sheet Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onOpenWhatsApp={(prod, size) => {
          setIsProductModalOpen(false);
          handleOpenProductWhatsApp(prod, size);
        }}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
        onOpenSizeGuide={() => {
          setIsProductModalOpen(false);
          setIsSizeGuideOpen(true);
        }}
      />

      {/* Interactive Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        onConsultWhatsApp={() => {
          setIsSizeGuideOpen(false);
          handleOpenGeneralWhatsApp();
        }}
      />

      {/* WhatsApp Link Simulator & Inquiry Recorder Modal */}
      <WhatsAppSimulatorModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        product={whatsAppProductTarget}
        selectedSize={whatsAppSelectedSize}
        onSaveInquiry={handleSaveWhatsAppInquiry}
      />

      {/* Wishlist / Multiple Inquiry Drawer */}
      <InquiryDrawer
        isOpen={isInquiryDrawerOpen}
        onClose={() => setIsInquiryDrawerOpen(false)}
        wishlist={wishlist}
        onRemoveItem={handleRemoveWishlistItem}
        onClearWishlist={handleClearWishlist}
        onConsultBulkWhatsApp={handleConsultBulkWhatsApp}
        onFillContactForm={handleFillContactFormFromWishlist}
      />

      {/* Interactive Cookie Consent Banner */}
      <CookieBanner />

      {/* Kodarvia Evaluator & LocalStorage Inspector Modal */}
      <KodarviaInspectionModal
        isOpen={isKodarviaModalOpen}
        onClose={() => setIsKodarviaModalOpen(false)}
        inquiries={inquiries}
        cookies={cookieConsent}
        wishlistCount={wishlist.length}
        onResetMockData={handleResetMockData}
        onClearAllData={handleClearAllData}
      />
    </div>
  );
}
