import { useState } from 'react';
import { hacerPregunta } from '../services/planService';
import { Atom, MessageCircleMore, Send, User } from 'lucide-react';

interface ChatIAProps {
  contexto: any;
}

export default function ChatIA({ contexto }: ChatIAProps) {
  const [mensaje, setMensaje] = useState('');
  const [historial, setHistorial] = useState<{ usuario: string; respuesta: string }[]>([]);
  const [cargando, setCargando] = useState(false);

  const enviar = async () => {
    if (!mensaje.trim()) return;

    const nuevaEntrada = { usuario: mensaje, respuesta: '' };
    setHistorial((prev) => [...prev, nuevaEntrada]);
    setMensaje('');
    setCargando(true);

    try {
      const data = await hacerPregunta(mensaje, contexto, historial);
      const nuevaRespuesta = { usuario: mensaje, respuesta: data.respuesta };
      setHistorial((prev) => [...prev.slice(0, -1), nuevaRespuesta]);
    } catch {
      alert('Error consultando a la IA');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="flex items-center text-lg sm:text-xl font-semibold text-cyan-700 gap-2">
        <MessageCircleMore className="w-5 h-5" /> Chat sobre tu plan
      </h3>

      <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-[50vh] overflow-y-auto shadow-inner space-y-3 text-sm sm:text-base">
        {historial.length === 0 && (
          <div className="text-cyan-700 flex gap-2 items-center font-medium">
            <Atom className="w-5 h-5" />
            IA: ¡Hazme una pregunta sobre tu plan!
          </div>
        )}
        {historial.map((h, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-start text-gray-900 font-medium gap-2">
              <User className="w-4 h-4 mt-1" /> Tú: {h.usuario}
            </div>
            <div className="flex items-start text-cyan-700 font-medium gap-2">
              <Atom className="w-4 h-4 mt-1" /> IA: {h.respuesta}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enviar()}
          className="w-full p-3 border border-cyan-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white text-gray-800"
          placeholder="Haz una pregunta sobre tu plan..."
        />
        <button
          onClick={enviar}
          disabled={cargando}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-1 disabled:opacity-50"
        >
          <Send size={16} />
          Enviar
        </button>
      </div>
    </div>
  );
}
