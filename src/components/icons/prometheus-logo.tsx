import type { SVGProps } from "react";

export function PrometheusLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="11" fill="#E6522C" />
      {/* Prometheus Flame / Torch Mark */}
      <path
        d="M12 3.5C12 3.5 13.8 6.2 13.8 8C13.8 8.8 13.4 9.5 12.8 10C13.6 9.8 14.5 10.3 14.8 11.2C15.2 12.3 14.5 13.6 13.5 14C14.2 14 15 14.5 15.2 15.2C15.6 16.5 14.2 18 12 18.5C9.8 18 8.4 16.5 8.8 15.2C9 14.5 9.8 14 10.5 14C9.5 13.6 8.8 12.3 9.2 11.2C9.5 10.3 10.4 9.8 11.2 10C10.6 9.5 10.2 8.8 10.2 8C10.2 6.2 12 3.5 12 3.5Z"
        fill="#FFFFFF"
      />
      <circle cx="12" cy="19.5" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}
