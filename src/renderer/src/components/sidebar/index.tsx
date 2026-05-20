import { Routes } from "@renderer/lib/routes";
import { Link } from "react-router-dom";

export default function Sidebar(): React.JSX.Element {
  return (
    <div>
      <Link to={Routes.HOME}>خانه</Link>

      <br />

      <Link to={Routes.SETTINGS}>تنظیمات</Link>
    </div>
  );
}
