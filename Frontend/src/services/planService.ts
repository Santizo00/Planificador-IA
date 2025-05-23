const API_URL = 'http://localhost:5000';

export async function generarPlan(goal: string, preferences: string[]) {
  const res = await fetch(`${API_URL}/generate-plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ goal, preferences })
  });

  if (!res.ok) throw new Error('Error generando plan');
  return await res.json();
}

export async function ajustarPlan(originalPlan: any, feedback: string) {
  const res = await fetch(`${API_URL}/adjust-plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ originalPlan, feedback })
  });

  if (!res.ok) throw new Error('Error ajustando plan');
  return await res.json();
}

export async function hacerPregunta(pregunta: string, contexto: any, historial: any[]) {
  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pregunta, contexto, historial })
  });

  if (!res.ok) throw new Error('Error en el chat');
  return await res.json();
}
