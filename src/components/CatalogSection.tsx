import React, { useState, useMemo } from 'react';
import { Product, AgeCategory } from '../types';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from './ProductCard';
import { Search, Filter, Sparkles, RotateCcw } from 'lucide-react';

interface CatalogSectionProps {
  onOpenProductModal: (product: Product) => void;
  onOpenWhatsApp: (product: Product, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  onOpenSizeGuide: () => void;
}

const CATEGORY_TABS: { id: AgeCategory; label: string }[] = [
  { id: 'todos', label: 'Todas las Prendas' },
  { id: 'recien_nacido', label: 'Recién Nacido (0-12M)' },
  { id: 'bebe', label: 'Bebés (1-3 Años)' },
  { id: 'infantil', label: 'Niñas & Niños (4-8 Años)' },
  { id: 'accesorios', label: 'Accesorios & Zapatitos' },
];

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  onOpenProductModal,
  onOpenWhatsApp,
  onToggleWishlist,
  wishlistIds,
  onOpenSizeGuide,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<AgeCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'todos' && item.ageCategory !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCollection = item.collectionLabel.toLowerCase().includes(q);
        const matchesMaterial = item.materials.toLowerCase().includes(q);
        const matchesSku = item.sku.toLowerCase().includes(q);
        if (!matchesName && !matchesCollection && !matchesMaterial && !matchesSku) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceUsd - b.priceUsd;
      if (sortBy === 'price-desc') return b.priceUsd - a.priceUsd;
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalogo" className="py-16 sm:py-24 bg-[#FAFAF7] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#2D312E]/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D97D64] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Catálogo de Referencia & Colección 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D312E] font-display">
              Prendas de Temporada
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#2D312E]/75 max-w-xl">
              Explorá nuestras líneas en algodón pima y lino. Podés consultar disponibilidad directa de cualquier prenda o talle por WhatsApp.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenSizeGuide}
            className="self-start md:self-auto py-2.5 px-4 text-xs font-semibold text-[#2D312E] bg-[#F3EFEA] hover:bg-[#EAE4DC] rounded-xl border border-[#2D312E]/10 transition-colors"
          >
            Guía de medidas & talles
          </button>
        </div>

        {/* Search & Filter Controls Toolbar */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D312E]/40" />
              <input
                type="text"
                placeholder="Buscar por prenda, tela (lino, pima) o talle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-[#2D312E]/15 bg-white text-[#2D312E] placeholder:text-[#2D312E]/40 focus:outline-none focus:ring-1 focus:ring-[#D97D64]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#2D312E]/40 hover:text-[#2D312E]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <label htmlFor="catalog-sort" className="text-xs text-[#2D312E]/70 font-medium whitespace-nowrap">
                Ordenar:
              </label>
              <select
                id="catalog-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs py-2 px-3 rounded-xl border border-[#2D312E]/15 bg-white text-[#2D312E] focus:outline-none focus:ring-1 focus:ring-[#D97D64]"
              >
                <option value="featured">Destacadas de temporada</option>
                <option value="price-asc">Menor precio primero</option>
                <option value="price-desc">Mayor precio primero</option>
              </select>
            </div>
          </div>

          {/* Interactive Category Segmented Tabs (Horizontal Scroll on Mobile) */}
          <div className="overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-1.5 p-1 bg-[#F3EFEA] rounded-xl w-max min-w-full sm:min-w-0">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                    selectedCategory === tab.id
                      ? 'bg-white text-[#2D312E] shadow-xs'
                      : 'text-[#2D312E]/70 hover:text-[#2D312E]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count & Active Filters Indicator */}
        <div className="flex items-center justify-between text-xs text-[#2D312E]/60 mb-6">
          <span>
            Mostrando <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'artículo' : 'artículos'}
          </span>
          {(selectedCategory !== 'todos' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="text-[#D97D64] hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#F3EFEA] rounded-2xl p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto text-[#2D312E]/40">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#2D312E] font-display">
              No encontramos prendas con esos filtros
            </h3>
            <p className="text-xs text-[#2D312E]/70 leading-relaxed">
              Probá ajustando la búsqueda o seleccioná otra categoría para descubrir toda la colección.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="py-2.5 px-4 bg-[#2D312E] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenModal={onOpenProductModal}
                onOpenWhatsApp={onOpenWhatsApp}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={wishlistIds.has(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
