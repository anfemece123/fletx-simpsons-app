FletxSimpsons – React Native App

Aplicación móvil construida para la prueba técnica de Fletx usando la API pública de The Simpsons. Incluye autenticación local, manejo de personajes, episodios, locations, notas y perfil.

🚀 Tecnologías utilizadas

React Native

React + TypeScript

Redux Toolkit

React Navigation

Axios

AsyncStorage

UUID

Yup

🧱 Arquitectura

Estructura modular organizada por dominios:

src/
  components/
  screens/
  hooks/
  services/
  storage/
  store/
  navigation/
  types/
  theme/


components: UI reutilizable (Button, TextInput, Pagination, MediaCard, BackButton)

screens: vistas por módulo

hooks: lógica de negocio y consumo de servicios

services: acceso a API

storage: persistencia local (usuarios y notas)

store: Redux slices

navigation: navegación global (Auth, Tabs, Stacks)

🔐 Autenticación

Registro e inicio de sesión con email y contraseña

Usuarios almacenados en AsyncStorage

Sesión mínima con sessionToken y userId persistido

Pantallas: SignIn y SignUp

👤 Perfil

Avatar con iniciales

Email e ID del usuario

Botón de logout que limpia Redux + AsyncStorage

🟨 Personajes

Grid de personajes (2 columnas)

Búsqueda por nombre

Detalle con imagen, edad, estado, ocupación y frases

Sistema de notas por personaje (crear, editar, eliminar)

📺 Episodios y Locations

Listados con tarjetas reutilizables (MediaCard)

Detalles con imagen y metadatos

Paginación reutilizable (Pagination)

📦 API

Base URL: https://thesimpsonsapi.com/api
Imágenes: https://cdn.thesimpsonsapi.com/500

▶ Ejecución
npm install
npm run ios
npm run android