import Sidebar from "@renderer/components/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout(): React.JSX.Element {
  return (
    <div>
      <Sidebar />

      <div>
        <Outlet />
      </div>
    </div>
  );
}
