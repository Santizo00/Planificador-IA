import { useEffect, useState } from 'react';
import { generarPlan } from '../services/planService';
import {
  Sparkles,
  Brain,
  Salad,
  Dumbbell,
  Palette,
  Briefcase,
  NotebookPen,
  HeartPulse,
} from 'lucide-react';
import ChatIA from '../components/ChatIA';
import { usePlan } from '../context/PlanContext';

export default function GenerarPlan() {
  const [goal, setGoal] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { planActivo, setPlanActivo, historial, setHistorial } = usePlan();

  useEffect(() => {
    if (planActivo) {
      setGoal(planActivo.goal);
      setPreferences(planActivo.preferences);
      setResultado(planActivo.resultado);
    }
  }, [planActivo]);

  useEffect(() => {
    if (resultado && !planActivo) {
      const nuevo = {
        id: Date.now().toString(), 
        fecha: new Date().toLocaleString(),
        goal,
        preferences,
        resultado,
        chat: [],
      };
      const actualizado = [nuevo, ...historial];
      setHistorial(actualizado);
      localStorage.setItem('historial_planes', JSON.stringify(actualizado));
      setPlanActivo(nuevo);
    }
  }, [resultado]);

  const handleSubmit = async () => {
    if (!goal.trim()) {
      alert('Debes ingresar al menos una meta principal.');
      return;
    }
    try {
      setLoading(true);
      const plan = await generarPlan(goal, preferences);
      setResultado(plan);
    } catch {
      alert('Error generando plan');
    } finally {
      setLoading(false);
    }
  };

  const iconos: Record<string, JSX.Element> = {
    bienestar: <Brain className="text-cyan-600 w-6 h-6 mt-1" />,
    nutricion: <Salad className="text-green-600 w-6 h-6 mt-1" />,
    entrenamiento: <Dumbbell className="text-emerald-600 w-6 h-6 mt-1" />,
    hobbys: <Palette className="text-pink-500 w-6 h-6 mt-1" />,
    profesional: <Briefcase className="text-gray-700 w-6 h-6 mt-1" />,
  };

  const formatPlanAsChat = (plan: any) =>
    Object.entries(plan).map(([clave, valor]) => (
      <div
        key={clave}
        className="flex items-start gap-4 bg-white rounded-lg shadow-md p-5 mb-4 w-full"
      >
        {iconos[clave] || <Sparkles className="w-6 h-6 mt-1 text-cyan-500" />}
        <div className="text-base text-gray-800 whitespace-pre-wrap break-words w-full">
          <span className="font-semibold capitalize text-cyan-800">{clave}:</span>{' '}
          {String(valor)}
        </div>
      </div>
    ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-teal-50 to-emerald-100 p-6">
      <div className="max-w-1xl mx-auto p-7 text-gray-900 border border-cyan-200 rounded-2xl shadow-2xl bg-white/70 backdrop-blur-sm">
        {!resultado ? (
          <>
            <h1 className="flex items-center justify-center gap-2 text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              <HeartPulse className="w-8 h-8 text-cyan-500" />
              Generador de Plan de Vida
              <HeartPulse className="w-8 h-8 text-cyan-500" />
            </h1>

            <div className="space-y-6 mb-8">
              <input
                className="w-full p-4 border-2 border-cyan-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 transition-all duration-300 text-gray-700 shadow-lg hover:shadow-xl bg-white/80"
                placeholder="¿Cuál es tu meta principal?"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />

              <input
                className="w-full p-4 border-2 border-cyan-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 transition-all duration-300 text-gray-700 shadow-lg hover:shadow-xl bg-white/80"
                placeholder="Áreas de mejora (ej: nutrición, bienestar, profesional)"
                onChange={(e) =>
                  setPreferences(
                    e.target.value
                      .split(',')
                      .map((p) => p.trim())
                      .filter((p) => p)
                  )
                }
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl transition-all duration-300 disabled:opacity-50 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Generando...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generar Plan
                  </div>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="flex items-center gap-2 text-2xl font-semibold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                <NotebookPen className="w-6 h-6 text-cyan-500" />
                Plan generado:
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 rounded-xl bg-cyan-50 border border-cyan-200 shadow-inner">
              {formatPlanAsChat(resultado)}
              <ChatIA contexto={resultado} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
