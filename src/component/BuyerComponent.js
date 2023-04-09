import React from 'react';
import { useSelector } from 'react-redux';

const BuyerComponent = (props) => {

    const { user } = useSelector((state) => state.user)

    if (user?.role == "buyer") {
        return <>
            {
                props.children
            }
        </>
    }
    return null;

}

export default BuyerComponent;
