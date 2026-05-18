import { Link } from "react-router-dom";

export default function Sidebar(): React.JSX.Element {
  return (
    <div>
      <Link to="/">خانه</Link>

      <br />

      <Link to="/patients">تنظیمات</Link>
    </div>
  );
}
