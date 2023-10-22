import { Fragment } from 'react';
import classes from './Modal.module.css';

const BackDrop = (props) => {
    return <div onClick={props.onClose} className={classes.backdrop}></div>
};

const ModalOverlay = (props) => {
    return(
        <div className={classes.modal}>
            {props.children}
        </div>
    );
};

const Modal = (props) => {
    return(
        <Fragment>
            <BackDrop onClose={props.onClose}/>
            <ModalOverlay>{props.children}</ModalOverlay>
        </Fragment>
    );
};

export default Modal;