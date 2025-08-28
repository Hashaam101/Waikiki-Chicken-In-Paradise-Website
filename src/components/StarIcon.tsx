import React from 'react';

type StarIconProps = {
  size?: number;
  className?: string;
  title?: string;
  hoverRays?: boolean; // rays appear on hover (or always if false)
  active?: boolean; // force 'hover' visual state (e.g., mobile scroll activation)
};

// Exact provided SVG. Color is controlled via currentColor (parent can set text color / hover color).
const StarIcon: React.FC<StarIconProps> = ({ size = 22, className = '', title, hoverRays = true, active = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
    role={title ? 'img' : undefined}
    aria-hidden={title ? undefined : true}
    focusable="false"
    className={className}
  >
    {title ? <title>{title}</title> : null}
    <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
      <path d="M 45 90 l -7.011 -23.731 c -0.385 -1.011 -0.877 -2.076 -1.436 -3.092 c -0.558 -1.015 -1.194 -1.999 -1.89 -2.926 c -0.698 -0.929 -1.466 -1.814 -2.284 -2.631 c -0.817 -0.818 -1.702 -1.586 -2.631 -2.284 c -0.929 -0.698 -1.913 -1.334 -2.925 -1.89 c -1.013 -0.558 -2.078 -1.049 -3.163 -1.46 L 0 45 l 23.731 -7.011 c 1.011 -0.385 2.075 -0.877 3.092 -1.436 c 1.015 -0.559 2 -1.195 2.926 -1.89 c 0.926 -0.696 1.811 -1.464 2.631 -2.284 s 1.588 -1.705 2.284 -2.631 c 0.695 -0.926 1.332 -1.91 1.89 -2.926 c 0.559 -1.017 1.051 -2.081 1.46 -3.163 L 45 0 l 6.999 23.695 c 0.409 1.074 0.896 2.126 1.447 3.128 c 0.556 1.013 1.193 1.997 1.89 2.926 c 0.698 0.928 1.466 1.813 2.284 2.63 c 0.817 0.818 1.702 1.586 2.631 2.284 c 0.927 0.696 1.911 1.332 2.926 1.89 c 1.016 0.559 2.081 1.051 3.162 1.46 L 90 45 l -23.731 7.01 c -1.015 0.387 -2.079 0.878 -3.092 1.437 c -1.012 0.556 -1.996 1.192 -2.926 1.89 c -0.931 0.7 -1.816 1.468 -2.631 2.284 c -0.816 0.815 -1.584 1.7 -2.284 2.631 c -0.699 0.93 -1.334 1.914 -1.89 2.925 c -0.558 1.014 -1.049 2.078 -1.46 3.164 L 45 90 z M 7.054 45 l 17.243 5.094 c 1.244 0.468 2.394 0.999 3.49 1.602 c 1.094 0.601 2.158 1.288 3.162 2.043 c 1.004 0.754 1.96 1.585 2.844 2.469 c 0.883 0.883 1.714 1.84 2.468 2.844 c 0.753 1.002 1.44 2.066 2.044 3.162 c 0.605 1.1 1.136 2.249 1.578 3.42 L 45 82.946 l 5.094 -17.243 c 0.468 -1.244 0.999 -2.395 1.602 -3.49 c 0.6 -1.092 1.288 -2.157 2.043 -3.162 c 0.757 -1.007 1.588 -1.964 2.469 -2.844 c 0.88 -0.881 1.837 -1.712 2.844 -2.469 c 1.005 -0.754 2.07 -1.442 3.163 -2.043 c 1.094 -0.603 2.245 -1.134 3.418 -1.579 L 82.946 45 l -17.243 -5.094 c -1.24 -0.466 -2.39 -0.997 -3.49 -1.602 c -1.096 -0.603 -2.16 -1.291 -3.162 -2.044 c -1.004 -0.754 -1.961 -1.584 -2.844 -2.468 c -0.884 -0.883 -1.715 -1.84 -2.469 -2.843 c -0.754 -1.005 -1.441 -2.069 -2.043 -3.163 c -0.603 -1.095 -1.134 -2.245 -1.579 -3.419 l -0.023 -0.071 L 45 7.055 l -5.094 17.242 c -0.466 1.24 -0.997 2.391 -1.602 3.489 c -0.604 1.098 -1.291 2.162 -2.044 3.163 c -0.751 1.001 -1.582 1.957 -2.468 2.843 c -0.886 0.886 -1.843 1.717 -2.843 2.468 c -1.001 0.752 -2.065 1.44 -3.163 2.044 c -1.099 0.605 -2.249 1.136 -3.419 1.578 L 7.054 45 z" fill="currentColor" />
  <rect x="69.77" y="61.27" width="2" height="18.99" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -29.3122 70.7658)" fill="currentColor" className={hoverRays ? `${active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ${active ? '' : 'group-hover:opacity-100'}` : 'opacity-100'} />
  <rect x="18.23" y="9.74" width="2" height="18.99" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.9671 19.2342)" fill="currentColor" className={hoverRays ? `${active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 delay-100 ${active ? '' : 'group-hover:opacity-100'}` : 'opacity-100'} />
  <rect x="61.27" y="18.23" width="18.99" height="2" transform="matrix(0.7071 -0.7071 0.7071 0.7071 7.1262 55.6725)" fill="currentColor" className={hoverRays ? `${active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 delay-200 ${active ? '' : 'group-hover:opacity-100'}` : 'opacity-100'} />
  <rect x="9.74" y="69.77" width="18.99" height="2" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -44.4054 34.3275)" fill="currentColor" className={hoverRays ? `${active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 delay-300 ${active ? '' : 'group-hover:opacity-100'}` : 'opacity-100'} />
    </g>
  </svg>
);

export default StarIcon;
