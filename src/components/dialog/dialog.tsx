import React, { FC, useState, useEffect } from "react";
import './dialog.css';
import Button from "../button/button";

const Dialog: FC<{open: Boolean, onAccept: Function, toggleScopeDialog: Function}> = (props) => {

    const [dialogOpen, setDialogOpen] = useState(props.open);

    useEffect(() => {
        setDialogOpen(props.open)
    }, [props.open])

    const toggleDialog = () => {
        setDialogOpen(!dialogOpen);
    }

    const handleAccept = () => {
        toggleDialog();
        props.onAccept();
        props.toggleScopeDialog();
    }

    const handleDecline = () => {
        toggleDialog();
        props.toggleScopeDialog();
    }

    return <>
        <div className={`dialog-overlay ${dialogOpen ? 'active' : ''}`}>
            <div className="dialog-window">
                <div className='dialog-text'>
                {props.children}
                </div>
                <div className='dialog-btn-container'>
                    <Button onClick={handleAccept}>Continue</Button>
                    <Button onClick={handleDecline}>Cancel</Button>
                </div>
            </div>
        </div>
    </>
}

export default Dialog;
