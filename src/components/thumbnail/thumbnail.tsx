import React, { FC, useState } from 'react';
import './thumbnail.css';
import LoadingImg from '../loading-img/loading-img';

type ThumbnailProps = {
    src: string,
}

const Thumbnail: FC<ThumbnailProps> = (props) => {
    return (
        <div className='thumbnail'>
            <LoadingImg alt='thumbnail' src={props.src}/>
        </div>
    );
}

export default Thumbnail;