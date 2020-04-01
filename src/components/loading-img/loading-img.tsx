import React, { FC, useState } from 'react';
import Spinner from '../../assets/spinner.svg'
import './loading-img.css'

type LoadingImgProps = {
    alt: string,
    src: string,
}

const LoadingImg: FC<LoadingImgProps> = (props) => {

    const [loading, setLoading] = useState(true);

    return (
        <div className='loading-img-cont'>
            <div className={`loading-img`}>
                <img className={`${loading ? '' : 'loaded'}`} alt={props.src} src={loading ? Spinner : props.src} onLoad={()=>setLoading(false)}/>
            </div>
        </div>

    );
}

export default LoadingImg;