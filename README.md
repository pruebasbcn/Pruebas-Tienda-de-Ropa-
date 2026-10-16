# Pequeña Luna · Ecuador
### Web Institucional y Catálogo de Referencia de Ropa Infantil

Proyecto desarrollado para el encargo de **Kodarvia** para el cliente **Pequeña Luna** (Cumbayá, Quito · Ecuador).

---

## 📋 Resumen del Proyecto

- **Cliente**: Pequeña Luna · Ecuador
- **Rubro**: Tienda de ropa infantil de confección noble (100% Algodón Pima orgánico y lino suave).
- **Destinatario para entrega**: `partners@kodarvia.com`
- **Enfoque técnico**: Frontend reactivo y adaptable sin backend externo (todo el flujo de persistencia se resuelve en el cliente mediante `localStorage`).
- **Prioridad celular**: Arquitectura de navegación ergonómica para celulares con barra inferior de acceso rápido (respetando la regla de $\le 15\%$ de altura fija) y botones táctiles $\ge 44\text{px}$.

---

## 🎨 Identidad Visual y Tipografía

El diseño cumple estrictamente con la paleta y fuentes señaladas en el briefing:

| Tono | Código Hex | Rol en la Interfaz |
| :--- | :--- | :--- |
| **Gris Grafito Profundo** | `#2D312E` | Textos principales, titulares contrastados y botones secundarios |
| **Verde Salvia** | `#8FA89B` | Detalles complementarios, insignias de sostenibilidad y acentos suaves |
| **Terracota Suave** | `#D97D64` | Color de acento principal y botones de llamada a la acción (CTA) |
| **Arena Claro** | `#F3EFEA` | Fondos de tarjetas, secciones alternas y visualizadores de prendas |
| **Blanco Cálido** | `#FAFAF7` | Fondo principal del lienzo (body background) |

### Tipografías
- **Outfit**: Encabezados (`h1`–`h6`), títulos de producto, logotipo y números de precio.
- **Plus Jakarta Sans**: Cuerpos de texto, fichas técnicas, menús de navegación y tablas de medidas.

---

## 🚀 Cómo Arrancar el Proyecto Localmente

1. Clonar el repositorio o descargar el paquete de archivos.
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo en el puerto 3000:
   ```bash
   npm run dev
   ```
4. Para compilar a producción:
   ```bash
   npm run build
   ```

---

## ⚙️ Qué Está Simulado y Dónde se Almacena

En cumplimiento de las instrucciones de Kodarvia, no se integraron APIs privadas con cobro ni bases de datos externas:

1. **Formulario de Contacto**:
   - Valida en tiempo real: nombre completo, correo electrónico válido, número de celular ecuatoriano (formato `09...` o internacional) y mensaje obligatorio con longitud mínima.
   - Genera un radicado único de seguimiento (`PL-EC-XXXXXX`).
   - Almacena la consulta en `localStorage` bajo la clave `pl_inquiries`.
2. **Consulta por Producto (WhatsApp)**:
   - Al hacer clic en *"Consultar"* en cualquier tarjeta o en la ficha técnica, se preselecciona automáticamente el artículo y el talle elegido.
   - Abre un modal simulador que permite:
     - Copiar el texto preformateado con SKU, precio y talle.
     - Simular el envío registrando la consulta en `localStorage`.
     - Probar el enlace real directo a `https://wa.me/593987654321?...`.
3. **Lista de Consulta Múltiple (Wishlist / Cotizador)**:
   - Permite a los clientes seleccionar varias prendas (ej. enterito + cardigan + mocasines) y enviar una consulta consolidada.
   - Almacenada en `localStorage` bajo `pl_wishlist`.
4. **Aviso de Cookies y Privacidad**:
   - Permite *Aceptar todas*, *Rechazar no esenciales* o *Configurar preferencias*.
   - Almacenado en `localStorage` bajo `pl_cookie_consent`.
5. **Panel de Inspección para Kodarvia**:
   - Accesible desde el footer (*"Inspeccionar LocalStorage"* o *"Avisos Kodarvia"*). Permite al evaluador auditar el contenido guardado en `localStorage` en tiempo real.

---

## 🔄 Cómo Reiniciar los Datos de Ejemplo

Para facilidad de evaluación por parte del equipo de Kodarvia, el sistema viene con datos realistas precargados (consultas de prueba de clientes en Quito y Guayaquil).

Para restablecerlos en cualquier momento:
- **Desde la interfaz**: En el pie de página (footer) o en el panel de auditoría, hacer clic en el botón **"Reiniciar datos de ejemplo"**.
- **Desde la consola del navegador**:
  ```javascript
  localStorage.clear();
  location.reload();
  ```

---

## 📱 Criterios de Aceptación Verificados

- [x] Adaptabilidad celular fluida con touch targets $\ge 44\text{px}$.
- [x] Validación completa de formulario de contacto con estados visuales de confirmación.
- [x] Consulta por WhatsApp preseleccionando el nombre, talle y SKU del artículo.
- [x] Metadatos dinámicos por producto, etiquetas semánticas y Schema.org JSON-LD configurado.
- [x] Cero texto de relleno (*lorem ipsum*): todas las descripciones, cuidados de lavado y medidas corresponden a prendas de algodón pima y lino verosímiles en Ecuador.
- [x] Banner de cookies interactivo con persistencia de preferencias.
- [x] Sin errores de compilación de TypeScript o ESLint.
