/**
 * FlameWatermark — decorative dual-tone flame graphic matching the
 * SSGC logo style (amber/orange outer flame, blue inner flame).
 * Used as a subtle background watermark, e.g. in the sidebar.
 *
 * Usage:
 *   <FlameWatermark className="w-40 opacity-10" />
 */
const FlameWatermark = ({ className = "w-40" }) => (
  <svg
    viewBox="0 0 200 260"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer flame — amber/orange */}
    <path
      d="M100 10
         C 60 55, 40 95, 40 140
         C 40 190, 65 230, 100 250
         C 135 230, 160 190, 160 140
         C 160 95, 140 55, 100 10 Z"
      fill="#F5A623"
      opacity="0.9"
    />
    {/* Mid flame layer — lighter amber, creates the licking-flame edge */}
    <path
      d="M100 40
         C 72 72, 58 102, 58 138
         C 58 175, 76 205, 100 220
         C 124 205, 142 175, 142 138
         C 142 102, 128 72, 100 40 Z"
      fill="#FBC96B"
      opacity="0.85"
    />
    {/* Inner flame — blue, the signature SSGC inner-flame detail */}
    <path
      d="M100 95
         C 84 118, 76 138, 76 158
         C 76 182, 86 200, 100 210
         C 114 200, 124 182, 124 158
         C 124 138, 116 118, 100 95 Z"
      fill="#2D6BA3"
      opacity="0.9"
    />
    {/* Innermost highlight — soft light blue core */}
    <path
      d="M100 130
         C 92 145, 88 158, 88 170
         C 88 184, 93 194, 100 200
         C 107 194, 112 184, 112 170
         C 112 158, 108 145, 100 130 Z"
      fill="#7FB8E6"
      opacity="0.8"
    />
  </svg>
);

export default FlameWatermark;