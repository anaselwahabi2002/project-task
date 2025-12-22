import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";

export default function ProjectsHeader({ onAdd }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="mb-10 flex items-center justify-between rounded-2xl
                 bg-gradient-to-r from-blue-600 to-blue-500
                 p-6 text-white shadow"
    >
      <div>
        <h1 className="text-3xl font-bold">My Projects</h1>
        <p className="mt-1 text-sm text-blue-100">
          Track and manage all your ongoing work
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onAdd}
          className="cursor-pointer rounded-xl bg-white px-5 py-2 font-medium text-blue-600
                     shadow-sm transition hover:bg-blue-50 active:scale-95
                     focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          + Add Project
        </button>

        <button
          onClick={handleLogout}
          className="cursor-pointer rounded-xl bg-red-500 px-5 py-2 font-medium text-white
                     shadow-sm transition hover:bg-red-600 active:scale-95
                     focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
