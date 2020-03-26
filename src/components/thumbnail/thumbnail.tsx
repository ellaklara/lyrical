import React, { FC, useState, useEffect } from 'react';
import './thumbnail.css'
import Spinner from '../../assets/spinner.svg'

type ThumbnailProps = {
    src: string,
}

const Thumbnail: FC<ThumbnailProps> = (props) => {

    const [loading, setLoading] = useState(true);
    return (
        <div className='thumbnail'>
            <img src={loading ? Spinner : props.src} onLoad={()=>setLoading(false)}/>
        </div>
    );
}

export default Thumbnail;