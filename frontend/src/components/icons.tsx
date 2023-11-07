import React from "react";

export type IconsType = {
  color?: string;
  innerColor?: string;
  strokeColor?: string;
  size?: number;
  opacity?: number;
  width?: number;
  height?: number;
};

export const GoogleIcon: React.FC<IconsType> = ({ size = 22 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 22 22"
    >
      <g clipPath="url(#clip0_2_19)">
        <path
          fill="#167EE6"
          d="M21.17 9.087h-8.974a.717.717 0 00-.717.717v2.867c0 .396.32.718.717.718h5.053a6.746 6.746 0 01-2.903 3.402l2.154 3.73c3.457-1.999 5.5-5.506 5.5-9.433 0-.559-.041-.958-.123-1.408a.72.72 0 00-.707-.593z"
        ></path>
        <path
          fill="#12B347"
          d="M11 17.696a6.694 6.694 0 01-5.791-3.351l-3.73 2.15A10.985 10.985 0 0011 22c1.995 0 3.878-.537 5.5-1.474v-.005l-2.155-3.73a6.646 6.646 0 01-3.345.905z"
        ></path>
        <path
          fill="#0F993E"
          d="M16.5 20.526v-.005l-2.155-3.73a6.646 6.646 0 01-3.345.905V22a10.98 10.98 0 005.5-1.474z"
        ></path>
        <path
          fill="#FFD500"
          d="M4.304 11c0-1.219.333-2.36.905-3.345l-3.73-2.15A10.886 10.886 0 000 11c0 2 .537 3.878 1.479 5.495l3.73-2.15A6.646 6.646 0 014.304 11z"
        ></path>
        <path
          fill="#FF4B26"
          d="M11 4.304c1.613 0 3.094.573 4.251 1.527.286.235.7.218.962-.044l2.031-2.03a.723.723 0 00-.041-1.058A10.967 10.967 0 0011 0 10.985 10.985 0 001.48 5.505l3.73 2.15c1.16-2 3.318-3.35 5.791-3.35z"
        ></path>
        <path
          fill="#D93F21"
          d="M15.251 5.83c.285.236.7.219.962-.043l2.03-2.03a.723.723 0 00-.04-1.058A10.967 10.967 0 0011 0v4.304c1.613 0 3.094.573 4.251 1.527z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_2_19">
          <path fill="#fff" d="M0 0H22V22H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export const FacebookIcon: React.FC<IconsType> = ({ size = 26 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 26 26"
    >
      <g clipPath="url(#clip0_2_28)">
        <path
          fill="#3B5998"
          d="M13 0c7.18 0 13 5.82 13 13s-5.82 13-13 13S0 20.18 0 13 5.82 0 13 0z"
        ></path>
        <path
          fill="#fff"
          d="M14.583 8.95h1.675V6.475h-1.97v.009c-2.386.084-2.875 1.426-2.918 2.835h-.005v1.235H9.74v2.424h1.625v6.497h2.45v-6.497h2.005l.388-2.424h-2.393v-.746c0-.476.317-.858.768-.858z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_2_28">
          <path fill="#fff" d="M0 0H26V26H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export const Loader: React.FC<IconsType> = ({
  size = "150",
  color = "#232323",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 100 100"
      xmlSpace="preserve"
      width={size}
    >
      <path
        fill={color}
        d="M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50m3.9 0c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          dur="1s"
          from="0 50 50"
          repeatCount="indefinite"
          to="360 50 50"
          type="rotate"
        ></animateTransform>
      </path>
    </svg>
  );
};
