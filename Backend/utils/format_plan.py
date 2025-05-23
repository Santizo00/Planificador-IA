import json
import re

def limpiar_y_parsear_plan(respuesta: str) -> dict | None:
    try:
        # Limpiar formato Markdown si viene con ```json
        limpio = re.sub(r"^```json|```$", "", respuesta.strip(), flags=re.MULTILINE).strip()

        # Arreglar comillas curvas si aparecen
        limpio = limpio.replace("“", '"').replace("”", '"')

        # Convertir a JSON
        data = json.loads(limpio)

        # Validar y normalizar claves esperadas
        return {
            "profesional": data.get("profesional", ""),
            "entrenamiento": data.get("entrenamiento", ""),
            "hobbys": data.get("hobbys", ""),
            "nutricion": data.get("nutricion", ""),
            "bienestar": data.get("bienestar", "")
        }

    except Exception as e:
        print("❌ Error al formatear respuesta de Gemini:", str(e))
        return None
