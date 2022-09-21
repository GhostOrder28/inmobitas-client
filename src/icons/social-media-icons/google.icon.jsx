import * as React from "react";

const GoogleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <defs>
      <path
        id="google-icon_svg__a"
        d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
      />
    </defs>
    <clipPath id="google-icon_svg__b">
      <use xlinkHref="#google-icon_svg__a" />
    </clipPath>
    <path
      d="M0 37V11l17 13z"
      clipPath="url(#google-icon_svg__b)"
      fill="#fbbc05"
      transform="matrix(.72727 0 0 .72727 -.955 -1.455)"
    />
    <path
      d="m0 11 17 13 7-6.1L48 14V0H0z"
      clipPath="url(#google-icon_svg__b)"
      fill="#ea4335"
      transform="matrix(.72727 0 0 .72727 -.955 -1.455)"
    />
    <path
      d="m0 37 30-23 7.9 1L48 0v48H0z"
      clipPath="url(#google-icon_svg__b)"
      fill="#34a853"
      transform="matrix(.72727 0 0 .72727 -.955 -1.455)"
    />
    <path
      d="M48 48 17 24l-4-3 35-10z"
      clipPath="url(#google-icon_svg__b)"
      fill="#4285f4"
      transform="matrix(.72727 0 0 .72727 -.955 -1.455)"
    />
  </svg>
);

export default GoogleIcon; 
