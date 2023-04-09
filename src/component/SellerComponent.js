import React from 'react';
import { useSelector } from 'react-redux';

const SellerComponent = (props) => {

    const { user } = useSelector((state) => state.user)

    if (user?.role == "seller") {
        return <>
            {
                props.children
            }
        </>
    }
    return null;

}

export default SellerComponent;
