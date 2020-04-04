import React, { FC} from 'react';
import './svg.css'

const Svg: FC<{icon: {viewBox: string, paths: string[]}}> = (props) => {
    return (
        <div className='svg-container'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox={props.icon.viewBox} >
                <g data-name="Layer 2">
                    <g data-name="search">
                        <rect width="100%" height="100%" opacity="0" />
                        {props.icon.paths.map((path) => 
                            <path d={path} />
                        )} 
                    </g>
                </g>
            </svg>
        </div>
    );
}

export default Svg;