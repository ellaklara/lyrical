import React, { FC } from 'react';
import './main-area.css'

const MainArea: FC<{}> = (props) => {

    return (
        <div className='main-area'> 
            {props.children}
        </div>
    );
}

export default MainArea;