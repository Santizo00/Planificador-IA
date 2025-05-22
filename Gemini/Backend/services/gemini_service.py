import os
import google.generativeai as genai
from dotenv import load_dotenv
import json 

load_dotenv()  # Cargar la clave desde .env

# Configurar la API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Seleccionar modelo compatible con AI Studio
modelo = genai.GenerativeModel("gemini-2.0-flash")

def generar_contenido(prompt: str) -> str:
    try:
        print("🔁 Enviando prompt a Gemini...")
        respuesta = modelo.generate_content(prompt)
        return respuesta.text
    except Exception as e:
        print("❌ Error al generar contenido con Gemini:", str(e))
        raise e

def generar_respuesta_con_historial(pregunta: str, contexto: dict, historial: list = []) -> str:
    try:
        mensajes = []

        # Introducción y contexto del plan actual
        mensajes.append({
            "role": "user",
            "parts": [
                "Eres un asistente de estilo de vida. Responde en español de forma clara, concisa y sin tecnicismos.",
                f"Este es el plan actual del usuario:\n{json.dumps(contexto, indent=2, ensure_ascii=False)}"
            ]
        })

        # Historial de conversación previo
        for entrada in historial:
            mensajes.append({"role": "user", "parts": [entrada["usuario"]]})
            mensajes.append({"role": "model", "parts": [entrada["respuesta"]]})

        # Pregunta actual del usuario
        mensajes.append({"role": "user", "parts": [pregunta]})

        chat = modelo.start_chat(history=mensajes)
        respuesta = chat.send_message(pregunta)

        return respuesta.text

    except Exception as e:
        print("❌ Error al generar respuesta con historial:", str(e))
        raise e