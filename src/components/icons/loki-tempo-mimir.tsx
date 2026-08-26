import type { SVGProps } from "react";

export function LokiLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="12" fill="#00A3E0" />
      {/* Grafana Loki Ship / Wave Logo */}
      <path
        d="M4.5 15.5C7 17.5 11 17.5 13.5 15.5L19.5 15.5C18.5 18 15 19.5 12 19.5C8 19.5 5 17.5 4.5 15.5Z"
        fill="#FFFFFF"
      />
      <path
        d="M12 4.5V13.5M12 4.5L7 11.5H12M12 6.5L16.5 12H12"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TempoLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="12" fill="#7B1FA2" />
      {/* Grafana Tempo Trace Metronome / T Logo */}
      <path
        d="M7 6H17M12 6V18M12 18L9 14M12 18L15 14"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2" fill="#FFC107" />
    </svg>
  );
}

export function MimirLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="12" fill="#00B0FF" />
      {/* Grafana Mimir Eye / Wisdom / Cloud Pillar */}
      <circle cx="12" cy="12" r="6" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
      <path
        d="M6 12C8 8.5 16 8.5 18 12C16 15.5 8 15.5 6 12Z"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

export function PyroscopeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="12" fill="#FF5252" />
      {/* Grafana Pyroscope Flame Graph / Scope */}
      <path
        d="M12 4C12 4 14.5 7.5 14.5 10C14.5 11.5 13.5 12.5 12 12.5C10.5 12.5 9.5 11.5 9.5 10C9.5 7.5 12 4 12 4Z"
        fill="#FFE082"
      />
      <path
        d="M7 17H17M8.5 14H15.5M10 11H14"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
