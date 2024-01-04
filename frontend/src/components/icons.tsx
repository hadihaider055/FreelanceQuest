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

export const DollarTagIcon: React.FC<IconsType> = ({
  size = "16",
  color = "#232323",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      viewBox="0 0 14 14"
      role="img"
      width={size}
    >
      <path d="M13.688.311L8.666 0 0 8.665 5.334 14 14 5.332 13.688.311zm-2.354 1.528a.827.827 0 11-.002 1.654.827.827 0 01.002-1.654zM6.441 9.892c-.384-.016-.761-.168-1.128-.455l-.73.729-.579-.578.73-.729a3.612 3.612 0 01-.498-.872 3.186 3.186 0 01-.223-.934l.965-.331c.018.339.094.672.229 1.002.133.325.297.586.488.777.164.164.32.264.473.295s.287-.009.4-.123a.422.422 0 00.131-.315c-.004-.123-.035-.249-.094-.381s-.146-.308-.27-.52a6.892 6.892 0 01-.39-.793 1.501 1.501 0 01-.086-.7c.028-.248.157-.486.383-.714.275-.273.596-.408.971-.402.369.008.74.149 1.109.423l.682-.682.578.577-.676.677c.176.224.326.461.446.707.121.25.205.495.252.734l-.965.354a3.638 3.638 0 00-.314-.84 2.369 2.369 0 00-.419-.616.863.863 0 00-.404-.253.344.344 0 00-.342.1.438.438 0 00-.109.458c.049.18.162.427.332.739.172.31.299.582.383.807.086.226.113.465.084.714-.03.252-.161.493-.393.723-.295.297-.635.436-1.016.422z"></path>
    </svg>
  );
};
