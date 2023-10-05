import React from 'react'

function Oicon({color,size}) {
  return (
    <div className={`icon ${color ? 'icon-' + color : 'icon-yellow'} ${size && 'icon-' + size}`}>
      <svg
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        viewBox="-169 -35 100 100"
      >
        <g>
          <path
            d="M-119,56.2c-22.7,0-41.2-18.5-41.2-41.2s18.5-41.2,41.2-41.2c22.7,0,41.2,18.5,41.2,41.2S-96.3,56.2-119,56.2z M-119-8
		c-12.7,0-23,10.3-23,23c0,12.7,10.3,23,23,23s23-10.3,23-23C-96,2.3-106.3-8-119-8z"
          />
        </g>
      </svg>
    </div>
  );
}

export default Oicon