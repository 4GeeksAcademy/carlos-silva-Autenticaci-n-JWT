# Estructura del template

Este archivo resume la estructura principal del proyecto y sus carpetas más importantes.

## 1. Estructura general

- `src/` — código fuente del backend y frontend
- `public/` — archivos estáticos generales
- `migrations/` — migraciones de base de datos
- `docs/` — documentación y recursos visuales
- `.devcontainer/` — configuración para Codespaces / Dev Containers

## 2. Archivos principales en la raíz

- `README.md` — documentación principal en inglés
- `README.es.md` — documentación principal en español
- `package.json` — dependencias y scripts del frontend
- `requirements.txt` — dependencias del backend en Python
- `Pipfile` y `Pipfile.lock` — entorno Pipenv
- `vite.config.js` — configuración de Vite
- `render.yaml` — despliegue en Render
- `Procfile` — despliegue en Heroku
- `Dockerfile.render` — imagen de despliegue
- `.env.example` — ejemplo de variables de entorno

## 3. Estructura de `src/`

### Backend

- `src/app.py` — arranque principal de Flask
- `src/wsgi.py` — punto de entrada WSGI
- `src/api/` — lógica del backend
  - `routes.py` — rutas de la API
  - `models.py` — modelos SQLAlchemy
  - `admin.py` — configuración de admin
  - `commands.py` — comandos Flask personalizados
  - `utils.py` — utilidades varias

### Frontend

- `src/front/` — aplicación React
  - `main.jsx` — entrada principal
  - `routes.jsx` — rutas de navegación
  - `store.js` — estado global
  - `index.css` — estilos globales
  - `pages/` — vistas principales
  - `components/` — componentes reutilizables
  - `hooks/` — hooks personalizados
  - `assets/` — imágenes y recursos

## 4. Estructura de `public/`

- `public/index.html` — HTML de la app
- `public/bundle.js` — bundle compilado
- `public/4geeks.ico` — icono del proyecto

## 5. Estructura de `migrations/`

- `migrations/alembic.ini` — configuración Alembic
- `migrations/env.py` — entorno de migraciones
- `migrations/versions/` — historial de migraciones

## 6. Estructura de `docs/`

- `docs/HELP.md` — guía adicional
- `docs/CHANGE_LOG.md` — registro de cambios
- `docs/assets/` — imágenes y recursos de documentación

## 7. Resumen rápido

Este template combina:

- React + Vite para el frontend
- Flask + SQLAlchemy para el backend
- Alembic para migraciones
- Render / Heroku para despliegue
