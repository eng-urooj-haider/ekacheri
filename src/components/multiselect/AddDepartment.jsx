import { useState, useRef, useEffect } from "react";

const ATTENDEE_OPTIONS = [
  { id: "anwar", label: "Mr. Anwar Baloch — DGM" },
  { id: "afeef", label: "Mr. Afeef Ahmed — General Manager" },
  { id: "sana", label: "Ms. Sana Tariq — Deputy Manager" },
  { id: "hamza", label: "Mr. Hamza Sheikh — Assistant Manager" },
  { id: "rabia", label: "Ms. Rabia Idrees — Coordinator" },
  { id: "imran", label: "Mr. Imran Qureshi — Manager Operations" },
  { id: "nadia", label: "Ms. Nadia Farooq — HR Lead" },
];

const AddDeptSelect = ({
  label = "Add Department",
  showLabel = true,
  showHelperText = true,
  options = ATTENDEE_OPTIONS,
  value, // optional: selected id (string), for controlled usage
  defaultValue = "", // initial selection when uncontrolled
  onChange, // optional: (selectedId, selectedOption) => void
  placeholder = "Select attendee…",
  disabled = false,
  className = "",
}) => {
  const isControlled = value !== undefined;

  const [internalSelectedId, setInternalSelectedId] = useState(defaultValue);
  const selectedId = isControlled ? value : internalSelectedId;

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const selectedOption = options.find((o) => o.id === selectedId) ?? null;

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  const updateSelection = (nextId) => {
    if (!isControlled) setInternalSelectedId(nextId);
    const nextOption = options.find((o) => o.id === nextId) ?? null;
    onChange?.(nextId, nextOption);
  };

  const selectOption = (id) => {
    if (disabled) return;
    updateSelection(id);
    setQuery("");
    setIsOpen(false);
  };

  const clearSelection = (e) => {
    e?.stopPropagation();
    if (disabled) return;
    updateSelection("");
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keep highlight in range as the filtered list changes
  useEffect(() => {
    setHighlightIndex((i) => Math.min(i, Math.max(filteredOptions.length - 1, 0)));
  }, [filteredOptions.length]);

  const handleKeyDown = (e) => {
    if (disabled) return;

    if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      setHighlightIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = filteredOptions[highlightIndex];
      if (opt) selectOption(opt.id);
    } else if (e.key === "Backspace" && query === "" && selectedOption) {
      clearSelection();
    }
  };

  return (
    <div className={`w-full ${className}`} ref={containerRef}>
      {showLabel && (
        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
          {label}
        </label>
      )}

      {/* Control */}
      <div
        onClick={() => {
          if (disabled) return;
          setIsOpen(true);
          inputRef.current?.focus();
        }}
        className={`flex w-full items-center gap-2 rounded-xl border bg-gray-50 px-3 py-2 transition-all duration-200
          ${disabled ? "cursor-not-allowed opacity-50" : "cursor-text"}
          ${isOpen ? "border-[#F5821F]/50 bg-white ring-2 ring-[#F5821F]/15" : "border-gray-200 hover:border-gray-300"}`}
      >
        {selectedOption && !isOpen && (
          <span className="flex items-center gap-1.5 rounded-lg bg-[#F5821F]/10 px-2.5 py-1 text-xs font-medium text-[#F5821F] ring-1 ring-[#F5821F]/25">
            {selectedOption.label}
            <button
              type="button"
              onClick={clearSelection}
              disabled={disabled}
              className="text-[#F5821F]/70 transition-colors hover:text-[#F5821F]"
              aria-label={`Remove ${selectedOption.label}`}
            >
              ×
            </button>
          </span>
        )}

        <input
          ref={inputRef}
          type="text"
          value={query}
          disabled={disabled}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightIndex(0);
          }}
          onFocus={() => !disabled && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={selectedOption && !isOpen ? "" : placeholder}
          className="min-w-[120px] flex-1 bg-transparent py-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed"
        />
      </div>

      {/* Dropdown panel */}
      {isOpen && !disabled && (
        <div className="relative">
          <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl bg-white ring-1 ring-gray-200 shadow-lg">
            <ul className="max-h-56 overflow-y-auto py-1">
              {filteredOptions.length === 0 && (
                <li className="px-3.5 py-3 text-sm text-gray-500">No attendees found.</li>
              )}

              {filteredOptions.map((opt, index) => {
                const selected = opt.id === selectedId;
                const highlighted = index === highlightIndex;
                return (
                  <li
                    key={opt.id}
                    role="option"
                    aria-selected={selected}
                    onClick={() => selectOption(opt.id)}
                    onMouseEnter={() => setHighlightIndex(index)}
                    className={`cursor-pointer px-3.5 py-2.5 text-sm transition-colors duration-100
                      ${highlighted ? "bg-gray-50" : ""}
                      ${selected ? "bg-[#F5821F]/10 font-medium text-[#F5821F]" : "text-gray-700"}`}
                  >
                    {opt.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {showHelperText && (
        <p className="mt-1.5 text-xs text-gray-500">
          {selectedOption ? `${selectedOption.label} selected.` : "Select one attendee."}
        </p>
      )}
    </div>
  );
};

export default AddDeptSelect;