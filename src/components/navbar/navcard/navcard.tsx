import React, { FC } from 'react';
import './navcard.css'

const Navcard: FC<{}> = (props) => {

    return (
        <div className='navcard-container'>
            <div className='navcard'>
                {props.children}
            </div>
        </div>
    );
}

export default Navcard;