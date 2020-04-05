import React, { FC } from "react";
import './mobile-warning.css';
import Svg from "../svg/svg";
import SvgIcons from '../../assets/icons/svg-icons.json'

const MobileWarning: FC<{}> = (props) => {
    return (
        <div className='mobile-warning'>
            <div>
                <div className='warning-icon'>
                    <Svg icon={SvgIcons.warningOutline}/>
                    Mobile version is under construction. <br/>
                    Please refer to the desktop website.
                </div>
            </div>
        </div>
    );
}

export default MobileWarning;