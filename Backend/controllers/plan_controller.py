from flask import request, jsonify
from services.gemini_service import generar_contenido
from utils.prompt_builder import construir_prompt
from utils.format_plan import limpiar_y_parsear_plan
from services.gemini_service import generar_respuesta_con_historial

def generate_plan():
    try:
        data = request.get_json()

        goal = data.get('goal')
        preferences = data.get('preferences', [])

        if not goal:
            return jsonify({"error": "Falta el objetivo"}), 400

        prompt = construir_prompt(goal, preferences)
        raw_response = generar_contenido(prompt)
        plan = limpiar_y_parsear_plan(raw_response)

        if not plan:
            return jsonify({"error": "La IA no devolvió un plan válido"}), 500

        return jsonify(plan)

    except Exception as e:
        print("❌ Error al generar plan:", str(e))
        return jsonify({"error": "Error interno al generar el plan"}), 500


def adjust_plan():
    try:
        data = request.get_json()
        original_plan = data.get("originalPlan")
        feedback = data.get("feedback")

        if not original_plan or not feedback:
            return jsonify({"error": "Faltan campos: originalPlan o feedback"}), 400

        prompt = f"""
Toma el siguiente plan de estilo de vida:

{original_plan}

El usuario ha dado esta retroalimentación:
"{feedback}"

Ajusta el plan tomando en cuenta sus comentarios. Devuélvelo en formato JSON con las mismas secciones, sin explicación adicional.
"""
        raw_response = generar_contenido(prompt)
        plan_ajustado = limpiar_y_parsear_plan(raw_response)

        if not plan_ajustado:
            return jsonify({"error": "La IA no devolvió un plan válido ajustado"}), 500

        return jsonify(plan_ajustado)

    except Exception as e:
        print("❌ Error al ajustar plan:", str(e))
        return jsonify({"error": "Error interno al ajustar el plan"}), 500

def chat_interactivo():
    try:
        data = request.get_json()
        pregunta = data.get("pregunta")
        contexto = data.get("contexto")
        historial = data.get("historial", [])

        if not pregunta or not contexto:
            return jsonify({"error": "Faltan campos obligatorios"}), 400

        respuesta = generar_respuesta_con_historial(pregunta, contexto, historial)
        return jsonify({"respuesta": respuesta})

    except Exception as e:
        print("❌ Error en chat interactivo:", str(e))
        return jsonify({"error": "Error interno en el chat"}), 500