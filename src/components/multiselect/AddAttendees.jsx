import { useState, useRef, useEffect } from "react";

/**
 * Add Attendees — dynamic multiselect dropdown.
 *
 * Fully interactive out of the box:
 *  - Click the field to open the dropdown
 *  - Type to search/filter options
 *  - Click an option (or press Enter) to select/deselect it
 *  - Remove a selection via the × on its chip, or Backspace when the input is empty
 *  - Arrow Up/Down to move the highlight, Escape or outside click to close
 *
 * Built to be wired up later:
 *  - `options` and the initial selection are props, not hardcoded — swap
 *    ATTENDEE_OPTIONS for real data (e.g. from an API) without touching the component.
 *  - `onChange(selectedIds, selectedOptions)` fires on every add/remove, so a
 *    parent form can lift the selection into its own state and submit it.
 *  - `value` lets a parent control the selection (controlled mode); omit it
 *    to let the component manage its own state (uncontrolled mode).
 *
 * Layout note:
 *  - Set `showLabel={false}` and `showHelperText={false}` when dropping this
 *    inside another layout's own label/row wrapper (e.g. a shared FieldRow),
 *    so you don't end up with two mismatched labels stacked on top of each other.
 */

const ATTENDEE_OPTIONS = [
  { id: "anwar", label: "Mr. Anwar Baloch — DGM" },
  { id: "afeef", label: "Mr. Afeef Ahmed — General Manager" },
  { id: "sana", label: "Ms. Sana Tariq — Deputy Manager" },
  { id: "hamza", label: "Mr. Hamza Sheikh — Assistant Manager" },
  { id: "rabia", label: "Ms. Rabia Idrees — Coordinator" },
  { id: "imran", label: "Mr. Imran Qureshi — Manager Operations" },
  { id: "nadia", label: "Ms. Nadia Farooq — HR Lead" },
];

const AddAttendeesMultiSelect = ({
  label = "Add Attendees",
  showLabel = true,
  showHelperText = true,
  options = ATTENDEE_OPTIONS,
  value, // optional: array of selected ids, for controlled usage
  defaultValue = [], // initial selection when uncontrolled
  onChange, // optional: (selectedIds, selectedOptions) => void
  placeholder = "Select attendee…",
  disabled = false,
  className = "",
}) => {
  const isControlled = value !== undefined;

  const [internalSelectedIds, setInternalSelectedIds] = useState(defaultValue);
  const selectedIds = isControlled ? value : internalSelectedIds;

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const selectedOptions = options.filter((o) => selectedIds.includes(o.id));

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  const updateSelection = (nextIds) => {
    if (!isControlled) setInternalSelectedIds(nextIds);
    const nextOptions = options.filter((o) => nextIds.includes(o.id));
    onChange?.(nextIds, nextOptions);
  };

  const toggleOption = (id) => {
    if (disabled) return;
    const nextIds = selectedIds.includes(id)
      ? selectedIds.filter((v) => v !== id)
      : [...selectedIds, id];
    updateSelection(nextIds);
    setQuery("");
    inputRef.current?.focus();
  };

  const removeOption = (id, e) => {
    e?.stopPropagation();
    if (disabled) return;
    updateSelection(selectedIds.filter((v) => v !== id));
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
      if (opt) toggleOption(opt.id);
    } else if (e.key === "Backspace" && query === "" && selectedOptions.length > 0) {
      removeOption(selectedOptions[selectedOptions.length - 1].id);
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
        className={`flex w-full flex-wrap items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2 ring-1 transition-all duration-200
          ${disabled ? "cursor-not-allowed opacity-50" : "cursor-text"}
          ${isOpen ? "ring-[#fab421]/40 bg-white/[0.06]" : "ring-white/[0.07]"}`}
      >
        {selectedOptions.map((opt) => (
          <span
            key={opt.id}
            className="flex items-center gap-1.5 rounded-lg bg-[#fab421]/15 px-2.5 py-1 text-xs font-medium text-[#fab421] ring-1 ring-[#fab421]/30"
          >
            {opt.label}
            <button
              type="button"
              onClick={(e) => removeOption(opt.id, e)}
              disabled={disabled}
              className="text-[#fab421]/70 transition-colors hover:text-[#fab421]"
              aria-label={`Remove ${opt.label}`}
            >
              ×
            </button>
          </span>
        ))}

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
          placeholder={selectedOptions.length === 0 ? placeholder : ""}
          className="min-w-[120px] flex-1 bg-transparent py-1 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed"
        />
      </div>

      {/* Dropdown panel */}
      {isOpen && !disabled && (
        <div className="relative">
          <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl bg-[#151516] ring-1 ring-white/[0.1] shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
            <ul className="max-h-56 overflow-y-auto py-1">
              {filteredOptions.length === 0 && (
                <li className="px-3.5 py-3 text-sm text-gray-500">No attendees found.</li>
              )}

              {filteredOptions.map((opt, index) => {
                const checked = selectedIds.includes(opt.id);
                const highlighted = index === highlightIndex;
                return (
                  <li
                    key={opt.id}
                    role="option"
                    aria-selected={checked}
                    onClick={() => toggleOption(opt.id)}
                    onMouseEnter={() => setHighlightIndex(index)}
                    className={`flex cursor-pointer items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors duration-100
                      ${highlighted ? "bg-white/[0.06]" : ""}
                      ${checked ? "text-gray-100" : "text-gray-300"}`}
                  >
                    <span
                      className={`flex size-4 shrink-0 items-center justify-center rounded-md ring-1 transition-colors
                        ${checked ? "bg-[#fab421] ring-[#fab421]" : "ring-white/[0.18]"}`}
                    >
                      {checked && (
                        <svg className="size-3 text-black" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M3.5 8.5 6 11l6.5-6.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
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
          {selectedOptions.length > 0
            ? `${selectedOptions.length} attendee${selectedOptions.length > 1 ? "s" : ""} selected.`
            : "Select one or more attendees."}
        </p>
      )}
    </div>
  );
};

export default AddAttendeesMultiSelect;