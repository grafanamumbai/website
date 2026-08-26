import type { SVGProps } from "react";

export function AlloyLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="12" fill="#1C2028" />
      {/* Grafana Alloy Telemetry Collector / Hex Core */}
      <path
        d="M12 4L18.5 7.7V15.3L12 19L5.5 15.3V7.7L12 4Z"
        stroke="#F46800"
        strokeWidth="1.8"
        fill="#F46800"
        fillOpacity="0.15"
      />
      <circle cx="12" cy="11.5" r="2.5" fill="#FFA726" />
      <path
        d="M12 7V9M7.5 14L9.5 13M16.5 14L14.5 13"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BeylaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="12" fill="#0E1E2E" />
      {/* Grafana Beyla eBPF Auto-instrumentation */}
      <path
        d="M12 5L17 8V14L12 17L7 14V8L12 5Z"
        stroke="#00E5FF"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8Z"
        fill="#F46800"
      />
      <circle cx="12" cy="11" r="1.5" fill="#FFFFFF" />
      <path
        d="M10 7L8 5M14 7L16 5"
        stroke="#00E5FF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function K6Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="12" fill="#7D64FF" />
      {/* Grafana k6 Load Testing Logo */}
      <path
        d="M6.5 6.5V17.5M6.5 12L13 6.5M8.5 10.5L14 17.5"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17.5" cy="14.5" r="2" fill="#FFA726" />
    </svg>
  );
}

export function OnCallLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="12" fill="#E65100" />
      {/* Grafana OnCall Incident / Bell Pager */}
      <path
        d="M12 5.5C9.5 5.5 7.5 7.5 7.5 10V14.5L6 16H18L16.5 14.5V10C16.5 7.5 14.5 5.5 12 5.5Z"
        fill="#FFFFFF"
      />
      <path
        d="M10.5 17.5C10.5 18.3 11.2 19 12 19C12.8 19 13.5 18.3 13.5 17.5"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="4" r="1" fill="#FFA726" />
    </svg>
  );
}

export function FaroLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="12" fill="#00897B" />
      {/* Grafana Faro Frontend RUM Beacon */}
      <path
        d="M10 6L14 6L15 18H9L10 6Z"
        fill="#FFFFFF"
        opacity="0.9"
      />
      <circle cx="12" cy="9" r="2" fill="#FFA726" />
      <path
        d="M6 8L8 9M18 8L16 9M5 12H7M17 12H19"
        stroke="#FFD54F"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
