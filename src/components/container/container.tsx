import React, { FC } from 'react';
import './container.css';

const Container: FC<{}> = (props) => {
    return (
        <div className='container'>
            {props.children}
        </div>
    );
}

export default Container;