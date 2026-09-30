# Filipo Café Resto Bar | Sistema de Feedback & Opinión

Aplicación web mobile-first interactiva para la recolección de feedback, reseñas y métricas de satisfacción de clientes en tiempo real para **Filipo Café Resto Bar** (Salta, Argentina).

El sistema permite a los clientes calificar de forma ágil su experiencia (ubicación en el salón, calidad de atención, comida, tiempo de espera y sugerencias abiertas), enviando los datos de forma directa y asíncrona a un backend en Google Sheets mediante Google Apps Script.

---

## 🚀 Stack Tecnológico

- **Frontend Core:** [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Estilos & Diseño:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconografía:** [Lucide React](https://lucide.dev/)
- **Almacenamiento / Backend:** Google Sheets API vía Google Apps Script (Web App Endpoint)
- **Integraciones:** Botón directo a WhatsApp Business oficial
- **Optimización & Calidad:** ESLint 10 + HTML5 Semantic / WCAG 2.1 A11y

---

## 📋 Características Principales

- **Experiencia de Usuario Fluida (Mobile-First):** Diseñado con padding táctil ergonómico para smartphones (360px - 430px) y adaptabilidad responsiva a tablets y desktop.
- **Envío Flexible & Sin Bloqueos:** El comensal puede responder libremente las preguntas que desee o simplemente dejar un comentario, sin campos forzados ni trabas de validación.
- **Cálculo Automático de Promedios:** Ponderación dinámica basada únicamente en los aspectos calificados, evitando valores nulos o sesgos en las métricas.
- **Accesibilidad y SEO:** Metadatos completos (Open Graph, Twitter Cards, favicons), atributos `aria-pressed`, `role="group"` y navegación por teclado optimizada (`focus-visible`).
- **Seguridad y Resiliencia:** Sanitización de strings en el cliente, prevención de doble envío concurrente, desacoplamiento de endpoints mediante variables de entorno y tolerancia a fallos.

---

## 🛠️ Instalación y Configuración Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/filipo-feedback.git
cd filipo-feedback
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copiá el archivo de plantilla `.env.example` para generar tu `.env` local:

```bash
# En Windows (CMD / PowerShell):
copy .env.example .env

# En Linux / macOS:
cp .env.example .env
```

Editá `.env` con las URLs correspondientes:
```env
VITE_FEEDBACK_API_URL=https://script.google.com/macros/s/TU_SCRIPT_ID/exec
VITE_WHATSAPP_URL=https://wa.me/549387XXXXXXX?text=Hola!%20Quer%C3%ADa%20comunicarme%20con%20ustedes
```

### 4. Iniciar servidor de desarrollo
```bash
npm run dev
```
La aplicación quedará disponible en `http://localhost:5173`.

---

## 📦 Compilación para Producción

Para validar el código con el linter y generar el bundle optimizado y minificado:

```bash
# Comprobación de estándares de código
npm run lint

# Generar bundle de producción en el directorio /dist
npm run build

# Previsualizar el build productivo localmente
npm run preview
```

---

## 🚢 Despliegue en GitHub

Comandos listos para inicializar el repositorio y subir la versión limpia a GitHub:

```bash
# 1. Inicializar repositorio Git
git init

# 2. Agregar todos los archivos preparados
git add .

# 3. Crear el primer commit semántico
git commit -m "feat: initial production-ready commit"

# 4. Establecer la rama principal como 'main'
git branch -M main

# 5. Vincular con tu repositorio remoto de GitHub (reemplazar con tu URL)
git remote add origin https://github.com/TU_USUARIO/filipo-feedback.git

# 6. Subir el proyecto a GitHub
git push -u origin main
```

---

## 📄 Licencia

Desarrollado para **Filipo Café Resto Bar**. Todos los derechos reservados.
