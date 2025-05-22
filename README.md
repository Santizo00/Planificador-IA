# Planificador-IA
Aplicación web que permite a los usuarios generar y ajustar un plan de estilo de vida personalizado usando **inteligencia artificial**.  
Este proyecto integra **dos motores de IA** en backends separados: **Gemini** y próximamente **DeepSeek**.

## 📁 Estructura del Proyecto

Planificador_IA/
├── Gemini/
│ ├── Backend/     
│ | ├── controllers/         
│ | | └── plan_controller.py          # Controladores: lógica para /generate-plan, /adjust-plan y /chat
│ | ├── routes/         
│ | | └── plan_routes.py              # Define y registra las rutas HTTP en Flask
│ | ├── services/         
│ | | └── gemini_service.py           # Lógica de integración con Gemini 2.0 Flash
│ | ├── utils/         
│ | | ├── prompt_builder.py           # Construcción dinámica del prompt según metas del usuario
│ | | └── format_plan.py              # Limpieza y validación de la respuesta de Gemini
| | ├── .env                          # Clave API para Gemini
| | ├── app.py                        # Punto de entrada principal de Flask
| | ├── requirements.txt              # Dependencias del entorno Python
|
├── DeepSeek/
│ ├── Backend/                        # (En construcción)
|
├── Frontend/                         # (En construcción)
feat(gemini-backend): implementar estructura en capas y endpoints para generación, ajuste y chat con contexto


---

## ✅ Funcionalidades actuales (Backend Gemini)

- ✔️ Generación de plan de estilo de vida estructurado basado en metas personales
- ✔️ Secciones generadas: `profesional`, `entrenamiento`, `hobbys`, `nutrición`, `bienestar`
- ✔️ Ajuste del plan basado en retroalimentación del usuario
- ✔️ Flujo de chat interactivo con contexto (preguntas personalizadas sobre el plan generado)
- ✔️ Respuestas 100% en español y formato JSON estructurado
- ✔️ Separación por capas: rutas, controladores, servicios, utilidades
- ✔️ Configurado con `.env` y API Key de MakerSuite para usar `gemini-2.0-flash`
- ✔️ Compatible con cualquier frontend vía API REST

---

## 🔧 Tecnologías utilizadas

- **Backend Gemini:**
  - Python 3.x
  - Flask + Flask-CORS
  - google-generativeai (SDK oficial de Gemini)
  - Dotenv

- **Frontend (en desarrollo):**
  - React + Vite
  - TypeScript
  - Tailwind CSS
  - Axios

---

## 🚧 Estado del Proyecto

| Componente           | Estado          |
|----------------------|-----------------|
| ✅ Backend Gemini    | **Completado**  |
| 🔄 Backend DeepSeek  | En proceso      | 
| 🔄 Frontend          | En proceso      |

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


## 📌 Contribución
Este proyecto fue creado como parte de un coding challenge técnico con el objetivo de explorar integraciones prácticas entre IA generativa y experiencia de usuario personalizada.



