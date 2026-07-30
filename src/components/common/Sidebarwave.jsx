/**
 * SidebarWave — decorative layered wave graphic for the bottom of the
 * sidebar, meant to sit behind FlameWatermark for a "flame over water/gas"
 * effect matching the SSGC light theme.
 *
 * Usage:
 *   <SidebarWave className="w-full" />
 */
const SidebarWave = ({ className = "w-full" }) => (
  <svg
    viewBox="0 0 272 160"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Back wave — lightest, sits furthest back */}
    <path
      d="M0 70
         C 40 50, 80 90, 130 70
         C 180 50, 220 85, 272 60
         L 272 160
         L 0 160 Z"
      fill="#E6F1FB"
    />
    {/* Mid wave — medium blue */}
    <path
      d="M0 95
         C 45 75, 90 110, 140 90
         C 190 72, 230 105, 272 85
         L 272 160
         L 0 160 Z"
      fill="#CDE3F7"
    />
    {/* Front wave — most saturated, closest to viewer */}
    <path
      d="M0 120
         C 50 105, 95 130, 145 115
         C 195 100, 235 125, 272 110
         L 272 160
         L 0 160 Z"
      fill="#AFCFEE"
    />
  </svg>
);

export default SidebarWave;