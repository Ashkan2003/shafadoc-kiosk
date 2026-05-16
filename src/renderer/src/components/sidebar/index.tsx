import { Link } from "react-router-dom";

export default function Sidebar(): React.JSX.Element {
  return (
    <div>
      <Link to="/">Dashboard</Link>

      <br />

      <Link to="/patients">Patients</Link>
    </div>
  );
}
