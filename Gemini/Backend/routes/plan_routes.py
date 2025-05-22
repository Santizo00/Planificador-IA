from flask import Blueprint
from controllers.plan_controller import generate_plan, adjust_plan, chat_interactivo

# Crear el Blueprint
plan_routes = Blueprint('plan_routes', __name__)

# Ruta para generar el plan inicial
@plan_routes.route('/generate-plan', methods=['POST'])
def handle_generate_plan():
    return generate_plan()

# Ruta para ajustar el plan existente con retroalimentación
@plan_routes.route('/adjust-plan', methods=['POST'])
def handle_adjust_plan():
    return adjust_plan()

@plan_routes.route('/chat', methods=['POST'])
def handle_chat():
    return chat_interactivo()

