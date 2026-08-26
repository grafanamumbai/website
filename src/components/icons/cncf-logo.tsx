import type { SVGProps } from "react";

export function CncfLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* CNCF Geometric Symbol */}
      <g transform="translate(10, -10)">
        <path
          d="M75.8 28.5L50.4 43.1V72.4L75.8 87L101.2 72.4V43.1L75.8 28.5Z"
          fill="#0086FF"
          opacity="0.9"
        />
        <path
          d="M50.4 43.1L25 57.8V87.1L50.4 101.7L75.8 87.1V57.8L50.4 43.1Z"
          fill="#D62293"
          opacity="0.85"
        />
        <path
          d="M75.8 87.1L50.4 101.7V131L75.8 145.6L101.2 131V101.7L75.8 87.1Z"
          fill="#FF4F00"
          opacity="0.8"
        />
        <path
          d="M101.2 72.4L75.8 87V116.3L101.2 130.9L126.6 116.3V87L101.2 72.4Z"
          fill="#00C49F"
          opacity="0.85"
        />
        <path
          d="M101.2 43.1L75.8 57.7V87L101.2 101.6L126.6 87V57.7L101.2 43.1Z"
          fill="#2B50AA"
          opacity="0.9"
        />
        <path
          d="M126.6 57.8L101.2 72.4V101.7L126.6 116.3L152 101.7V72.4L126.6 57.8Z"
          fill="#00B4D8"
          opacity="0.8"
        />
      </g>
      {/* CNCF Text Mark */}
      <text
        x="175"
        y="62"
        fill="currentColor"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="34"
        letterSpacing="3"
      >
        CNCF
      </text>
      <text
        x="177"
        y="86"
        fill="#8E95A5"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="500"
        fontSize="12"
        letterSpacing="1"
      >
        CLOUD NATIVE COMPUTING FOUNDATION
      </text>
    </svg>
  );
}

export function CncfIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M50 15L25 29.5V58.5L50 73L75 58.5V29.5L50 15Z"
        fill="#0086FF"
      />
      <path
        d="M25 29.5L0 44V73L25 87.5L50 73V44L25 29.5Z"
        fill="#D62293"
        opacity="0.85"
      />
      <path
        d="M75 29.5L50 44V73L75 87.5L100 73V44L75 29.5Z"
        fill="#00C49F"
        opacity="0.9"
      />
    </svg>
  );
}
