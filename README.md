# FletxSimpsons – Prueba técnica React Native

Aplicación móvil construida como prueba técnica para Fletx, basada en la API pública de The Simpsons. Incluye autenticación local, listado y detalle de personajes, episodios, locations, notas por personaje y pantalla de perfil.

## 🚀 Stack Tecnológico
- React Native 0.82
- React 19 + TypeScript
- Redux Toolkit
- React Navigation (Stacks & Tabs)
- AsyncStorage (persistencia local)
- Axios
- UUID
- Yup

## 🧱 Arquitectura del Proyecto
Estructura modular y mantenible:

- src
- ├── assets/            # Imágenes (logo, Homer, Bart)
- ├── components/        # Componentes UI reutilizables
- │   ├── common/        # Button, TextInput, MediaCard, Pagination, etc.
- │   └── characters/    # CharacterCard
- ├── screens/           # Pantallas por dominio
- │   ├── auth/          # SignIn, SignUp
- │   ├── characters/    # List, Detail, Notes
- │   ├── episodes/      # List, Detail
- │   ├── locations/     # List, Detail
- │   └── profile/       # Perfil de usuario
- ├── hooks/             # Lógica de negocio (custom hooks)
- ├── services/          # Llamadas HTTP a la API
- ├── storage/           # Persistencia local (usuarios, notas)
- ├── navigation/        # Stacks, Tabs y RootNavigator
- ├── store/             # Redux store + slices
- ├── theme/             # Colores globales
- └── types/             # Tipos TypeScript (auth, personajes, etc.)



## 🔐 Autenticación
- Registro e inicio de sesión con email y contraseña
- Usuarios y sesión guardados en AsyncStorage
- UUID como session token
- Protección de navegación con Redux

## 🟨 Personajes
- Grid de 2 columnas
- Búsqueda por nombre
- Detalle con foto, edad, estado, ocupación y frases
- Notas por personaje (crear, editar, eliminar)
- Persistencia local con notesStorage

## 📺 Episodios y Locations
- Listados con tarjetas homogéneas (MediaCard)
- Detalles con imagen y metadatos
- Componente reutilizable Pagination

## 👤 Perfil
- Avatar con iniciales
- Email
- Logout que limpia Redux + AsyncStorage

## ▶ Ejecución
- npm install
- npm run ios
- npm run android


## 📡 API
Base: https://thesimpsonsapi.com/api  
Imágenes: https://cdn.thesimpsonsapi.com/500


