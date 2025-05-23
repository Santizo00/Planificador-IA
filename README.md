# Planificador-IA

Aplicación web que permite a los usuarios generar y ajustar un plan de estilo de vida personalizado usando **inteligencia artificial**.  
Este proyecto implementa un backend con **Gemini 2.0 Flash**, y se encuentra en desarrollo un frontend basado en React.

---

## 📁 Estructura del Proyecto

```text
Planificador_IA/
├── Backend/ # Backend con Python y Gemini 2.0 Flash
│   ├── controllers/
│   │   └── plan_controller.py       # Lógica para /generate-plan, /adjust-plan y /chat
│   ├── routes/
│   │   └── plan_routes.py           # Define las rutas HTTP con Flask
│   ├── services/
│   │   └── gemini_service.py        # Conexión con Gemini 2.0 Flash
│   ├── utils/
│   │   ├── prompt_builder.py        # Construcción dinámica del prompt
│   │   └── format_plan.py           # Limpieza y validación del plan generado
│   ├── .env                         # Clave API de MakerSuite
│   ├── app.py                       # Punto de entrada principal
│   └── requirements.txt            # Dependencias Python
├── Frontend/                        # Interfaz de usuario en React + Vite
|
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatIA.tsx           # Chat con IA sobre el plan generado
│   │   │   ├── SidebarHistorial.tsx # Historial de planes generados
│   │   │   └── Layout.tsx           # Estructura principal con Sidebar
│   │   ├── context/
│   │   │   └── PlanContext.tsx      # Estado global de planActivo e historial
│   │   ├── pages/
│   │   │   ├── GenerarPlan.tsx      # Pantalla para generar/ver plan y conversar
│   │   │   └── Menu.tsx             # Página de inicio (no usada activamente)
│   │   └── services/
│   │       └── planService.ts       # Llamadas HTTP al backend Gemini
└── README.md
```

---

## ✅ Funcionalidades Actuales

### Backend (Gemini)
- ✔️ Generación de plan estructurado en base a metas personales
- ✔️ Secciones personalizadas: `profesional`, `entrenamiento`, `hobbys`, `nutrición`, `bienestar`
- ✔️ Ajuste dinámico del plan en base a feedback
- ✔️ Chat con contexto y seguimiento
- ✔️ Respuestas limpias en JSON y en español

### Frontend
- ✔️ Interfaz moderna y responsiva con Tailwind
- ✔️ Entrada de metas y áreas de mejora
- ✔️ Visualización del plan como "conversación"
- ✔️ Componente de chat contextual
- ✔️ Historial de planes generados y chats asociados
- ✔️ Función para continuar conversaciones pasadas
- ✔️ LocalStorage para persistencia sin base de datos
- ✔️ Botón de nuevo plan y limpieza de historial

---

## 🔧 Tecnologías Utilizadas

- **Backend:**
  - Python 3.x
  - Flask
  - Flask-CORS
  - Google Generative AI (Gemini)
  - Dotenv

- **Frontend:**
  - React
  - Vite
  - TypeScript
  - Tailwind CSS
  - Axios
  - Lucide-react (íconos)
  - LocalStorage API

---

## 🚧 Estado del Proyecto

| Componente        | Estado          |
|-------------------|-----------------|
| Backend Gemini    | **Completado**  |
| Frontend          | **Completado**  |

---

## ▶️ Cómo ejecutar el backend de Gemini

### 1. Clona el repositorio:

```bash
git clone https://github.com/tu_usuario/Planificador_IA.git
cd Planificador_IA/Gemini/backend
```

### 2. Crea entorno virtual e instala dependencias:
python -m venv venv
venv\Scripts\activate  # o source venv/bin/activate en Linux/Mac

pip install -r requirements.txt

### 3. Agrega tu API Key en .env
GEMINI_API_KEY=tu_clave_de_makersuite

### 4. Ejecuta el servidor:
python app.py


## 📬 Endpoints disponibles
- POST /generate-plan

Genera un plan con base en las metas y preferencias del usuario.

{
  "goal": "Quiero mejorar mi salud y organizar mi tiempo.",
  "preferences": ["entrenamiento", "nutricion", "bienestar"]
}

- POST /adjust-plan

Ajusta un plan previamente generado según retroalimentación.

{
  "originalPlan": { ... },
  "feedback": "Prefiero hacer ejercicio solo fines de semana"
}

- POST /chat

Permite hacer preguntas personalizadas sobre el plan, con historial de conversación.

{
  "pregunta": "¿Puedo cambiar el horario del entrenamiento?",
  "contexto": { "entrenamiento": "...", "nutricion": "..." },
  "historial": [
    {
      "usuario": "¿Puedo hacer ejercicio solo fines de semana?",
      "respuesta": "Sí, puedes adaptar la rutina a fines de semana."
    }
  ]
}

## ▶️ Cómo ejecutar el backend de Gemini

1. Desde la raíz del proyecto:
```bash
cd Frontend
npm install
npm run dev
```
2. La app estará disponible en: http://localhost:3000

## 🤖 Herramientas de IA Utilizadas
Este proyecto fue completamente ideado y construido por el autor del repositorio.
ChatGPT (GPT-4) fue utilizado como apoyo técnico para:

Resolver errores de tipado y lógica en React + TypeScript

Diseñar estructuras óptimas para el manejo de estado global y localStorage

Refinar la integración del backend Gemini con el frontend

Todo el diseño arquitectónico, lógica del flujo, estructura del historial, diseño del chat y estilo visual fueron implementados y definidos directamente por el autor del proyecto.

## 📌 Contribución
Este proyecto fue creado como parte de un coding challenge técnico con el objetivo de explorar integraciones prácticas entre IA generativa y experiencia de usuario personalizada.



