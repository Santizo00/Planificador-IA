import { Outlet } from 'react-router-dom';
import SidebarHistorial from '../components/SidebarHistorial';

export default function Layout() {
  return (
    <div className="w-screen h-screen flex bg-white overflow-hidden">
      <SidebarHistorial />
      <main className="flex-1 h-full w-full flex flex-col overflow-hidden">
        <div className="flex-1 w-full overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
