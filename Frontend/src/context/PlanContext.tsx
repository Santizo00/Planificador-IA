import { createContext, useContext, useState } from 'react';

type PlanHistorial = {
  id: string;
  goal: string;
  preferences: string[];
  resultado: any;
  chat: { role: 'user' | 'assistant'; content: string }[];
  fecha: string;
};

type ContextType = {
  planActivo: PlanHistorial | null;
  setPlanActivo: (plan: PlanHistorial | null) => void;
  historial: PlanHistorial[];
  setHistorial: (h: PlanHistorial[]) => void;
};

const PlanContext = createContext<ContextType | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [planActivo, setPlanActivo] = useState<PlanHistorial | null>(null);
  const [historial, setHistorial] = useState<PlanHistorial[]>(() => {
    return JSON.parse(localStorage.getItem('historial_planes') || '[]');
  });

  return (
    <PlanContext.Provider value={{ planActivo, setPlanActivo, historial, setHistorial }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error('usePlan debe usarse dentro de PlanProvider');
  return context;
}
