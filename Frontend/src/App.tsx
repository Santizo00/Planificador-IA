import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Plan from "./pages/GenerarPlan";
import { PlanProvider } from './context/PlanContext';

export default function App() {
  return (
    <PlanProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Plan />} />
        </Route>
      </Routes>
    </PlanProvider>
  );
}
