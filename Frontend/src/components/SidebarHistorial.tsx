import { FileClock, FilePlus2, Trash2, Menu } from "lucide-react";
import { usePlan } from "../context/PlanContext";
import { useEffect, useRef, useState } from "react";

export default function SidebarHistorial() {
  const { setPlanActivo, setHistorial, historial } = usePlan();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const limpiarHistorial = () => {
    localStorage.removeItem("historial_planes");
    setHistorial([]);
    setPlanActivo(null);
  };

  const nuevoPlan = () => {
    setPlanActivo(null);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 bg-white shadow p-2 rounded-lg border border-cyan-300"
        >
          <Menu className="w-6 h-6 text-cyan-800" />
        </button>
      )}

      <aside
        ref={sidebarRef}
        className={`fixed md:static top-0 left-0 h-full z-40 bg-cyan-100 border-r border-cyan-300 p-4 shadow-md transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-72`}
      >
        <div className="flex justify-between items-center mb-4">
          {historial.length > 0 && (
            <button
              onClick={limpiarHistorial}
              className="flex items-center gap-2 text-sm bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-700 text-white px-3 py-1 rounded-md font-semibold"
              title="Limpiar historial"
            >
              <Trash2 className="w-5 h-5" />
              Borrar Historial
            </button>
          )}

          <button
            onClick={nuevoPlan}
            className="flex items-center gap-2 text-sm bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-700 text-white px-3 py-1 rounded-md font-semibold"
          >
            <FilePlus2 className="w-5 h-5" />
            Nuevo
          </button>
        </div>

        <h2 className="flex text-lg font-semibold text-cyan-800 gap-2 mb-3">
          <FileClock className="w-5" /> Historial
        </h2>

        {historial.map((plan: any) => (
          <div
            key={plan.id}
            className="mb-3 bg-white rounded-lg shadow p-3 text-sm cursor-pointer hover:bg-cyan-50 transition"
            onClick={() => {
              setPlanActivo(plan);
              setIsOpen(false);
            }}
          >
            <div className="font-semibold text-cyan-700">{plan.goal}</div>
            <div className="text-xs text-gray-500">{plan.fecha}</div>
            <div className="text-xs italic text-cyan-700">
              Áreas: {plan.preferences.join(", ")}
            </div>
          </div>
        ))}
      </aside>
    </>
  );
}
