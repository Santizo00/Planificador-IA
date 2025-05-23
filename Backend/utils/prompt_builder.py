def construir_prompt(goal: str, preferences: list = []) -> str:
    secciones = ", ".join(preferences) if preferences else (
        "profesional, entrenamiento físico, nutrición, hobbies y bienestar emocional"
    )

    return f"""
Eres un asistente de estilo de vida impulsado por inteligencia artificial.

Con base en el objetivo del usuario y sus intereses, genera un plan estructurado, útil y realista para mejorar su vida.

🔍 Objetivo del usuario:
"{goal}"

📌 Áreas de interés: {secciones}

🧾 Formato esperado:
Devuelve el plan en formato JSON. Cada sección debe ser una clave con un texto explicativo.

Ejemplo:
{{
  "profesional": "Consejos sobre carrera, estudios o productividad...",
  "entrenamiento": "Rutina semanal de ejercicios adaptada al usuario...",
  "hobbys": "Actividades que fomenten creatividad y relajación...",
  "nutricion": "Plan de alimentación balanceado...",
  "bienestar": "Hábitos mentales y emocionales para mejorar el día a día..."
}}

Por favor, responde solo con el JSON sin explicaciones adicionales.
"""
