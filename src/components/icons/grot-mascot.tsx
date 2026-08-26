import type { SVGProps } from "react";

export function GrotMascot({
  className = "w-24 h-24",
  animate = true,
  ...props
}: SVGProps<SVGSVGElement> & { animate?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        {/* Soft Radial Ambient Glow */}
        <radialGradient id="grot-ambient-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F46800" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#FF9900" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FF9900" stopOpacity="0" />
        </radialGradient>

        {/* Mascot Wood Bark Body Gradient */}
        <linearGradient id="grot-bark-grad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6C4E31" />
          <stop offset="50%" stopColor="#4A3423" />
          <stop offset="100%" stopColor="#2E1C12" />
        </linearGradient>

        {/* Head Bark Gradient */}
        <linearGradient id="grot-head-grad" x1="40" y1="20" x2="160" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7E5C3D" />
          <stop offset="60%" stopColor="#543A26" />
          <stop offset="100%" stopColor="#382216" />
        </linearGradient>

        {/* Visor / Eye Glow */}
        <linearGradient id="grot-visor-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA000" />
          <stop offset="50%" stopColor="#FF5722" />
          <stop offset="100%" stopColor="#D84315" />
        </linearGradient>

        {/* Leaf Sprout Gradient */}
        <linearGradient id="grot-leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#81C784" />
          <stop offset="100%" stopColor="#2E7D32" />
        </linearGradient>

        {/* Grafana Orange Swirl Accent */}
        <linearGradient id="grot-orange-swirl" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9100" />
          <stop offset="100%" stopColor="#F46800" />
        </linearGradient>

        <filter id="grot-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ambient background aura */}
      <circle cx="100" cy="100" r="90" fill="url(#grot-ambient-glow)" />

      {/* Mascot Body & Shadow */}
      <ellipse cx="100" cy="178" rx="42" ry="9" fill="#0A0C10" opacity="0.6" />

      {/* Feet / Roots */}
      <path
        d="M74 158C72 166 65 174 54 176C52 176 54 172 58 168C62 163 68 158 74 158Z"
        fill="#382216"
      />
      <path
        d="M126 158C128 166 135 174 146 176C148 176 146 172 142 168C138 163 132 158 126 158Z"
        fill="#382216"
      />

      {/* Torso */}
      <path
        d="M70 120C70 115 78 110 100 110C122 110 130 115 130 120L126 160C126 166 114 170 100 170C86 170 74 166 74 160L70 120Z"
        fill="url(#grot-bark-grad)"
        stroke="#2E1C12"
        strokeWidth="2"
      />

      {/* Left Arm / Waving Hand */}
      <g className={animate ? "origin-[62px_122px] animate-pulse" : ""}>
        <path
          d="M72 124C58 118 44 100 46 86C47 84 52 87 56 94C60 102 68 114 74 122"
          fill="none"
          stroke="#543A26"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Hand / Sprout fingers */}
        <circle cx="46" cy="85" r="4" fill="#6C4E31" />
        <path
          d="M46 84C42 78 40 70 42 66C44 68 47 74 48 82Z"
          fill="url(#grot-leaf-grad)"
        />
      </g>

      {/* Right Arm */}
      <path
        d="M128 124C140 130 152 140 156 150C157 152 154 153 151 150C146 144 138 134 128 128"
        fill="none"
        stroke="#4A3423"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Grot Mascot Head (Groot-style tree-crown with natural notches) */}
      <path
        d="M62 58C62 58 56 36 68 34C74 33 80 44 86 42C92 40 94 24 104 24C114 24 116 38 122 40C128 42 134 32 140 34C150 38 144 58 144 58C154 72 156 94 150 114C142 134 124 140 100 140C76 140 58 134 50 114C44 94 48 72 62 58Z"
        fill="url(#grot-head-grad)"
        stroke="#2E1C12"
        strokeWidth="3"
      />

      {/* Natural Head Bark Texture / Notches */}
      <path
        d="M72 44C76 52 82 56 80 62M128 44C124 52 118 56 120 62M66 84C72 88 74 94 72 100M134 84C128 88 126 94 128 100"
        stroke="#382216"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Sprouting Leaf on Head Crown */}
      <path
        d="M104 24C104 14 114 6 124 8C126 18 116 26 104 24Z"
        fill="url(#grot-leaf-grad)"
      />
      <path
        d="M103 24C98 16 90 12 82 14C82 22 92 26 103 24Z"
        fill="url(#grot-leaf-grad)"
        opacity="0.85"
      />

      {/* Observability Telemetry Visor / High-Tech Glasses */}
      <rect
        x="64"
        y="70"
        width="72"
        height="30"
        rx="15"
        fill="#14161D"
        stroke="#F46800"
        strokeWidth="2.5"
      />

      {/* Dual Glowing Eyes inside Visor */}
      <g filter="url(#grot-glow-filter)">
        {/* Left Eye */}
        <circle cx="84" cy="85" r="7.5" fill="url(#grot-visor-grad)" />
        <circle cx="82" cy="83" r="2.5" fill="#FFF" />

        {/* Right Eye */}
        <circle cx="116" cy="85" r="7.5" fill="url(#grot-visor-grad)" />
        <circle cx="114" cy="83" r="2.5" fill="#FFF" />
      </g>

      {/* Smiling Friendly Mouth */}
      <path
        d="M90 114C94 120 106 120 110 114"
        fill="none"
        stroke="#2E1C12"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Rosy Cheeks */}
      <circle cx="68" cy="104" r="5" fill="#F46800" opacity="0.3" />
      <circle cx="132" cy="104" r="5" fill="#F46800" opacity="0.3" />

      {/* Chest Grafana Swirl Medallion */}
      <circle cx="100" cy="140" r="13" fill="#14161D" stroke="#F46800" strokeWidth="1.5" />
      <g transform="translate(93, 133) scale(0.6)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.566 2.01a10.98 10.98 0 0 0-10.556 11 11.002 11.002 0 0 0 7.333 10.37 11.002 11.002 0 0 0 13.222-13.222 11.002 11.002 0 0 0-10-8.148zm.556 2.444a8.556 8.556 0 0 1 7.667 6.111 8.556 8.556 0 0 1-9.778 10.333 8.556 8.556 0 0 1-6.111-7.667 8.556 8.556 0 0 1 8.222-8.777zm-4.889 4.889a6.111 6.111 0 0 0 4.889 10.333 6.111 6.111 0 0 0 6.111-6.111 6.111 6.111 0 0 0-11-4.222zm4.889 2.444a3.667 3.667 0 0 1 3.667 3.667 3.667 3.667 0 0 1-3.667 3.667 3.667 3.667 0 0 1-3.667-3.667 3.667 3.667 0 0 1 3.667-3.667z"
          fill="#F46800"
        />
      </g>
    </svg>
  );
}
