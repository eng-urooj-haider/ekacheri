import { Link, useNavigate, useLocation } from "react-router";
import {
  Building2,
  MapPin,
  Users,
  FileText,
  MessageSquareWarning,
  ShieldCheck,
  LogOut,
  Landmark,
  LayoutDashboard
} from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import LogoImage from "../components/common/LogoImage.jsx";
import { useUser } from "../context/UserContext.jsx";
const navItems = [
  {
    icon: <LayoutDashboard size={18} strokeWidth={2} />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <Building2 size={18} strokeWidth={2} />,
    name: "City",
    path: "/cities",
  },
  {
    icon: <MapPin size={18} strokeWidth={2} />,
    name: "Location",
    path: "/locations",
  },
  {
    icon: <Landmark size={18} strokeWidth={2} />,
    name: "Department",
    path: "/departments",
  },
  {
    icon: <Users size={18} strokeWidth={2} />,
    name: "Department Focal Person",
    path: "/dfps",
  },
  {
    icon: <FileText size={18} strokeWidth={2} />,
    name: "E-kacheri",
    path: "/kachehries",
  },
  {
    icon: <MessageSquareWarning size={18} strokeWidth={2} />,
    name: "E-kacheri Complaints",
    path: "/complaints",
  },
  {
    icon: <ShieldCheck size={18} strokeWidth={2} />,
    name: "Admin Users",
    path: "/users",
  },
];

const ROLE_2_ALLOWED_PATHS = ["/kachehries", "/complaints"];

const AppSidebar = () => {
  const navigate = useNavigate();
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const isWide = isExpanded || isHovered || isMobileOpen;
  const isActive = (path) => location.pathname === path;

  const { user, logout } = useUser();

  const visibleNavItems =
    user && user.roleId == 2
      ? navItems.filter((item) => ROLE_2_ALLOWED_PATHS.includes(item.path))
      : navItems;

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const renderMenuItems = (items) => (
    <ul className="flex flex-col gap-1.5">
      {items.map((nav) => {
        const active = isActive(nav.path);
        return (
          <li key={nav.name}>
            <Link
              to={nav.path}
              className={`group relative flex items-center w-full gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-out
                ${
                  active
                    ? "bg-[#F5821F]/[0.10] text-[#D9631A] font-semibold ring-1 ring-[#F5821F]/15"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }
                ${!isWide ? "lg:justify-center lg:px-0 lg:py-3" : ""}`}
            >
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full bg-[#F5821F] transition-all duration-200 ease-out
                  ${active ? "h-6 w-1 opacity-100" : "h-0 w-1 opacity-0"}`}
              />
              <span
                className={`relative flex shrink-0 items-center justify-center rounded-lg transition-all duration-200
                  ${
                    active
                      ? "size-8 bg-white text-[#F5821F] shadow-sm ring-1 ring-[#F5821F]/20"
                      : "size-8 text-gray-500 group-hover:text-gray-700 group-hover:bg-white"
                  }
                  [&_svg]:size-[18px]`}
              >
                {nav.icon}
              </span>
              {isWide && (
                <span className="truncate tracking-wide">{nav.name}</span>
              )}
              {active && isWide && (
                <span className="ml-auto size-1.5 shrink-0 rounded-full bg-[#F5821F]" />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed top-0 left-0 z-50 mt-20 flex h-screen flex-col text-gray-800 transition-all duration-300 ease-in-out
        bg-white
        border-r border-gray-200 shadow-sm
        lg:mt-0
        ${
          isExpanded || isMobileOpen
            ? "w-[272px]"
            : isHovered
              ? "w-[272px]"
              : "w-[84px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex shrink-0 items-center border-b border-gray-100 px-4 py-5
          ${!isWide ? "lg:justify-center lg:px-0" : "justify-start"}`}
      >
        <Link to="/" className="flex items-center gap-3 min-w-0">
          {isWide ? (
            <div className="flex items-center gap-3 rounded-2xl  px-3.5 py-2.5">
              <LogoImage maxWidth="200px" />
            </div>
          ) : (
            <div className="flex size-12 w-[90%] items-center justify-center rounded-xl  transition-transform duration-300 hover:scale-105">
              <img
                src="/images/logo/logo.png"
                alt="Sui Southern Gas Company Limited"
                className="size-96 object-contain"
              />
            </div>
          )}
        </Link>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-3.5 py-6 no-scrollbar">
        <nav className="px-1">
          <h2
            className={`mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400
              ${!isWide ? "lg:justify-center" : "justify-start px-2"}`}
          >
            {isWide ? (
              <>
                <span>Navigation</span>
                <span className="h-px flex-1 bg-gray-100" />
              </>
            ) : (
              <svg
                className="size-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
                />
              </svg>
            )}
          </h2>
          {renderMenuItems(visibleNavItems)}
        </nav>
      </div>

      {/* Watermark — kept subtle, doesn't compete with nav */}
      {isWide && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full">
            <img
              src="/images/fw.png"
              className="absolute bottom-0 left-0 w-full scale-110 opacity-70 object-cover"
            />
          </div>
        </div>
      )}

      <div className="relative px-3.5 pb-4">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
        >
          <span className="flex size-8 items-center justify-center rounded-lg">
            <LogOut size={18} />
          </span>
          {isWide && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;