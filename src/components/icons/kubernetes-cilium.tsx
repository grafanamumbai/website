import type { SVGProps } from "react";

export function KubernetesLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="11" fill="#326CE5" />
      {/* Kubernetes 7-spoke Helm Wheel */}
      <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
      <circle cx="12" cy="12" r="1.5" fill="#326CE5" />
      <path
        d="M12 4.5V7.5M12 16.5V19.5M5.5 8.2L8.1 9.7M15.9 14.3L18.5 15.8M5.5 15.8L8.1 14.3M15.9 9.7L18.5 8.2"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="4" r="1.2" fill="#FFFFFF" />
      <circle cx="12" cy="20" r="1.2" fill="#FFFFFF" />
      <circle cx="5" cy="8" r="1.2" fill="#FFFFFF" />
      <circle cx="19" cy="8" r="1.2" fill="#FFFFFF" />
      <circle cx="5" cy="16" r="1.2" fill="#FFFFFF" />
      <circle cx="19" cy="16" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}

export function CiliumLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="12" fill="#1C2C3D" />
      {/* Cilium eBPF Bee / Hexagon Network Mark */}
      <path
        d="M12 4L18 7.5V14.5L12 18L6 14.5V7.5L12 4Z"
        stroke="#F46800"
        strokeWidth="1.6"
        fill="none"
      />
      <circle cx="12" cy="8" r="1.5" fill="#FFC107" />
      <circle cx="9" cy="13" r="1.5" fill="#00C49F" />
      <circle cx="15" cy="13" r="1.5" fill="#00A3E0" />
      <path
        d="M12 9.5V12M10 13.5L14 13.5"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function JaegerLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="12" fill="#60D0E4" />
      {/* CNCF Jaeger Tracing Gopher mark */}
      <circle cx="10" cy="10" r="3" fill="#FFFFFF" />
      <circle cx="10" cy="10" r="1.5" fill="#0A0C10" />
      <circle cx="16" cy="10" r="2.5" fill="#FFFFFF" />
      <circle cx="16" cy="10" r="1.2" fill="#0A0C10" />
      <path
        d="M8 15C10 17 14 17 16 15"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
