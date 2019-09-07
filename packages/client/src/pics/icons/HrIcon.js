import React from "react";

const SvgHrIcon = props => (
  <svg viewBox="0 0 48 32" {...props}>
    <defs>
      <style>{".hr_icon_svg__cls-1{fill:#418fde}"}</style>
    </defs>
    <g id="hr_icon_svg__Layer_2" data-name="Layer 2">
      <g id="hr_icon_svg__Icons">
        <path
          className="hr_icon_svg__cls-1"
          d="M39 15h-2a8.957 8.957 0 00-3.66.782A13.973 13.973 0 0139 27h9v-3a9 9 0 00-9-9zM14.66 15.782A8.957 8.957 0 0011 15H9a9 9 0 00-9 9v3h9a13.973 13.973 0 015.66-11.218zM25 16h-2a11 11 0 00-11 11v5h24v-5a11 11 0 00-11-11z"
        />
        <circle className="hr_icon_svg__cls-1" cx={24} cy={7} r={7} />
        <circle className="hr_icon_svg__cls-1" cx={10} cy={8} r={5} />
        <circle className="hr_icon_svg__cls-1" cx={38} cy={8} r={5} />
      </g>
    </g>
  </svg>
);

export default SvgHrIcon;
