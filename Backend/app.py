from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Rutas
from routes.plan_routes import plan_routes

# Cargar .env
load_dotenv()

# Configurar Flask
app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False  # Para que devuelva texto con tildes y eñes correctamente

# Registrar rutas
app.register_blueprint(plan_routes)

# Iniciar servidor
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
