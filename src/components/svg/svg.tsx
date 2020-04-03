import React, { FC} from 'react';

const Svg: FC<{path: string, fill: string}> = (props) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={props.fill}>
            <g data-name="Layer 2">
                <g data-name="search">
                    <rect width="24" height="24" opacity="0" />
                    <path
                        d={props.path} />
                </g>
            </g>
        </svg>
    );
}

export default Svg;