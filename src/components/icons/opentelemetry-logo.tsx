import type { SVGProps } from "react";

export function OpenTelemetryLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="11" fill="#425CC7" />
      {/* OpenTelemetry Constellation / Scope */}
      <circle cx="8" cy="15" r="2" fill="#F5A800" />
      <circle cx="16" cy="15" r="2" fill="#00C49F" />
      <circle cx="12" cy="8" r="2.2" fill="#FFFFFF" />
      <path
        d="M8.8 13.5L11.2 9.5M15.2 13.5L12.8 9.5M9.8 15H14.2"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
