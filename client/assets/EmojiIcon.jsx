import * as React from "react";

function EmojiIcon(props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_54_17)">
        <path d="M16 30a14 14 0 110-28 14 14 0 010 28zm0 2a16 16 0 100-32 16 16 0 000 32z" />
        <path d="M8.57 19.134a1 1 0 011.366.366A6.996 6.996 0 0016 23a6.997 6.997 0 006.064-3.5 1 1 0 111.732 1A8.996 8.996 0 0116 25a8.996 8.996 0 01-7.796-4.5 1 1 0 01.366-1.366zM14 13c0 1.656-.896 3-2 3s-2-1.344-2-3 .896-3 2-3 2 1.344 2 3zm8 0c0 1.656-.896 3-2 3s-2-1.344-2-3 .896-3 2-3 2 1.344 2 3z" />
      </g>
      <defs>
        <clipPath id="clip0_54_17">
          <path fill="#fff" d="M0 0H32V32H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default EmojiIcon;
