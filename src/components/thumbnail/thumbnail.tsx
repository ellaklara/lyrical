import React, { FC, useState } from 'react';
import './thumbnail.css'
import Spinner from '../../assets/spinner.svg'

type ThumbnailProps = {
    src: string,
}

const Thumbnail: FC<ThumbnailProps> = (props) => {

    const [loading, setLoading] = useState(true);
    return (
        <div className='thumbnail'>
            <img alt='thumbnail' src={loading ? Spinner : props.src} onLoad={()=>setLoading(false)}/>
        </div>
    );
}

export default Thumbnail;