import React, { FC } from 'react';
import './area-header.css';

const AreaHeader: FC<{}> = (props) => {
    return (
        <div className='area-header-container'>
            <div className='area-header'>
                {props.children}
            </div>
        </div>
    );
}

export default AreaHeader;