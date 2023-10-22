import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import { useContext, useEffect, useState } from 'react';

const HeaderCartButton = (props) => {
    const [buttonHilighted, setButtonHilighted] = useState(false);
    const cartCtx =  useContext(CartContext);

    const { items } = cartCtx;
    const numberOfCartItems = items.reduce((prevValue, item) => prevValue + item.amount, 0);

    const btnClasses = `${classes.button} ${buttonHilighted ? classes.bump : ''}`;

    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setButtonHilighted(true);

        const timer = setTimeout(() => {
            setButtonHilighted(false)
        }, 300);

        return (() => clearTimeout(timer));
        
    }, [items]);
    

    return(
        <button onClick={props.onClick} className={btnClasses}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton;