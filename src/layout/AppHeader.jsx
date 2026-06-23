import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useSidebar } from "../context/SidebarContext";
// import NotificationDropdown from "../components/header/NotificationDropdown";
import UserDropdown from "../components/header/UserDropdown";

// Replace with real announcements / news items as needed
const ANNOUNCEMENTS = [
  "New billing cycle starts on the 1st — review your invoices before the deadline.",
  "Scheduled maintenance this weekend from 11 PM to 3 AM.",
  "Updated safety guidelines for field teams are now available in the docs.",
  "Customer portal will support online complaint tracking starting next month.",
];

const AppHeader = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const marqueeText = ANNOUNCEMENTS.join("     •     ");

  return (
    <header className="sticky top-0 z-99999 flex w-full min-w-0 max-w-full min-h-20 bg-[#0a0a0a] border-b border-white/[0.07]">
      <div className="flex w-full min-w-0 max-w-full min-h-20 items-stretch">
        {/* Menu toggle — same row as announcement, flush left */}
        <button
          className="z-99999 flex shrink-0 items-center justify-center px-5 text-gray-400 transition-all duration-200 hover:bg-white/[0.05] hover:text-[#fab421] border-r border-white/[0.07]"
          onClick={handleToggle}
          aria-label="Toggle Sidebar"
        >
          {isMobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg width="18" height="14" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>

        {/* Announcement marquee — same row, fills remaining space */}
        <div className="relative flex min-w-0 flex-1 items-stretch overflow-hidden">
          <div className="flex shrink-0 items-center gap-2 bg-[#fab421]/[0.1] px-5 py-3 ring-1 ring-[#fab421]/15">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#fab421]/60" />
              <span className="relative inline-flex size-2 rounded-full bg-[#fab421]" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#fab421] whitespace-nowrap">
              Announcements
            </span>
          </div>

          <div className="group relative min-w-0 flex-1 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

            <div className="marquee-track flex h-full items-center gap-12 whitespace-nowrap text-sm font-medium text-gray-400 group-hover:[animation-play-state:paused]">
              <span className="px-4">{marqueeText}</span>
              <span className="px-4" aria-hidden="true">
                {marqueeText}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile logo */}
        <Link to="/" className="flex shrink-0 items-center px-4 lg:hidden">
          <div className="flex items-center rounded-lg bg-white/[0.97] px-3 py-1.5 ring-1 ring-white/10">
            <img className="h-8 w-auto object-contain" src="./images/logo/logo.png" alt="Logo" />
          </div>
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={toggleApplicationMenu}
          className="z-99999 flex shrink-0 items-center justify-center px-5 text-gray-400 transition-colors duration-200 hover:bg-white/[0.05] hover:text-[#fab421] lg:hidden border-l border-white/[0.07]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
              fill="currentColor"
            />
          </svg>
        </button>

        {/* Desktop right side: search + user */}
        <div className="hidden shrink-0 items-center gap-3 border-l border-white/[0.07] px-5 lg:flex">
          <UserDropdown />
        </div>
      </div>

      {/* Mobile dropdown panel for user/search if needed */}
      {isApplicationMenuOpen && (
        <div className="absolute left-0 top-full flex w-full items-center justify-end gap-4 border-b border-white/[0.07] bg-[#0a0a0a] px-4 py-3 lg:hidden">
          <UserDropdown />
        </div>
      )}

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          width: max-content;
          animation: marquee-scroll 36s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </header>
  );
};

export default AppHeader;