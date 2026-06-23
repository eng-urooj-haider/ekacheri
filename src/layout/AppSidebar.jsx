import { Link, useLocation } from "react-router";
import {
  GridIcon,
  CalenderIcon,
  UserCircleIcon,
  HorizontaLDots,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";

const navItems = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: "/calendar",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/profile",
  },
];

const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();

  const location = useLocation();
  const isWide = isExpanded || isHovered || isMobileOpen;

  const isActive = (path) => location.pathname === path;

  const renderMenuItems = (items) => (
    <ul className="flex flex-col gap-1.5">
      {items.map((nav) => {
        const active = isActive(nav.path);
        return (
          <li key={nav.name}>
            <Link
              to={nav.path}
              className={`group relative flex items-center w-full gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ease-out
                ${
                  active
                    ? "bg-gradient-to-r from-[#fab421]/[0.13] via-white/[0.05] to-transparent text-white"
                    : "text-gray-400 hover:bg-white/[0.04] hover:text-gray-200"
                }
                ${!isWide ? "lg:justify-center lg:px-0 lg:py-3" : ""}`}
            >
              {/* Active indicator */}
              <span
                className={`absolute -left-3.5 top-1/2 -translate-y-1/2 rounded-full bg-[#fab421] transition-all duration-300 ease-out
                  ${active ? "h-5 w-[3px] opacity-100 shadow-[0_0_10px_2px_rgba(250,180,33,0.5)]" : "h-0 w-[3px] opacity-0"}`}
              />

              {/* Icon */}
              <span
                className={`relative flex shrink-0 items-center justify-center rounded-lg transition-all duration-300
                  ${
                    active
                      ? "size-8 bg-[#fab421]/[0.12] text-[#fab421] ring-1 ring-[#fab421]/20"
                      : "size-8 text-gray-500 group-hover:text-gray-200 group-hover:bg-white/[0.04]"
                  }
                  [&_svg]:size-[18px]`}
              >
                {nav.icon}
              </span>

              {isWide && (
                <span className="truncate tracking-wide">{nav.name}</span>
              )}

              {active && isWide && (
                <span className="ml-auto size-1.5 shrink-0 rounded-full bg-[#fab421] shadow-[0_0_8px_rgba(250,180,33,0.6)]" />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed top-0 left-0 z-50 mt-20 flex h-screen flex-col text-white transition-all duration-300 ease-in-out
        bg-[radial-gradient(ellipse_120%_60%_at_50%_-10%,rgba(250,180,33,0.07),transparent_60%),linear-gradient(180deg,#0c0c0d_0%,#080808_100%)]
        border-r border-white/[0.07] shadow-[6px_0_40px_rgba(0,0,0,0.55)]
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
      {/* Hairline sheen at top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Logo */}
      <div
        className={`flex shrink-0 items-center border-b border-white/[0.06] px-4 py-5
          ${!isWide ? "lg:justify-center lg:px-0" : "justify-start"}`}
      >
        <Link to="/" className="flex items-center gap-3 min-w-0">
          {isWide ? (
            <div className="flex items-center gap-3 rounded-2xl bg-white/[0.97] px-3.5 py-2.5 ring-1 ring-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
              <img
                src="/images/logo/logo.png"
                alt="Sui Southern Gas Company Limited"
                className="h-10 w-auto max-w-[190px] object-contain"
              />
            </div>
          ) : (
            <div className="flex size-12 items-center justify-center rounded-xl bg-white/[0.97] ring-1 ring-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105">
              <img
                src="/images/logo/logo.png"
                alt="Sui Southern Gas Company Limited"
                className="size-8 object-contain"
              />
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex flex-1 flex-col overflow-y-auto px-3.5 py-6 no-scrollbar">
        <nav className="px-1">
          <h2
            className={`mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500
              ${!isWide ? "lg:justify-center" : "justify-start px-2"}`}
          >
            {isWide ? (
              <>
                <span>Navigation</span>
                <span className="h-px flex-1 bg-white/[0.07]" />
              </>
            ) : (
              <HorizontaLDots className="size-5 text-gray-600" />
            )}
          </h2>

          {renderMenuItems(navItems)}
        </nav>
      </div>

      {/* Footer */}
      {isWide && (
        <div className="shrink-0 border-t border-white/[0.06] px-4 py-4">
          <div className="relative overflow-hidden rounded-2xl bg-white/[0.025] px-4 py-3.5 ring-1 ring-white/[0.06]">
            <div className="pointer-events-none absolute -right-6 -top-8 size-24 rounded-full bg-[#fab421]/10 blur-2xl" />
            <p className="relative text-xs font-semibold text-gray-200">
              Need help?
            </p>
            <p className="relative mt-1 text-[11px] leading-relaxed text-gray-500">
              Check our docs or reach out to support — we usually reply within
              a few hours.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default AppSidebar;