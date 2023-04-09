import axios from 'axios';
import { useState, useEffect } from 'react';
import noImage from "../asset/no-image.jpg"
import ReactPaginate from "react-paginate"
import { Link } from "react-router-dom"
import BuyerComponent from '../component/BuyerComponent';
import SellerComponent from '../component/SellerComponent';
import { useDispatch } from 'react-redux';
import { setCart } from '../redux/slice/CartSlice';

const Home = (props) => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [metadata, setMetaData] = useState({
        total: 0,
        page: 1,
        per_page: 25,
    })
    const [search_term, setSearchTerm] = useState("")

    function fetchProducts() {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/products?page=${metadata.page}&search_term=${props.search_term} `)
            .then(res => {
                console.log(res)
                setProducts(res.data.data[0].data)
                if (res.data.data[0].metadata[0]) {
                    setMetaData(res.data.data[0].metadata[0])
                }
            }).catch(err => {

            })
    }

    useEffect(() => {
        fetchProducts()
    }, [metadata.page, props.search_term]);

    const handlePageClick = (event) => {
        // const newOffset = (event.selected * itemsPerPage) % products.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        // console.log(event);
        // setItemOffset(newOffset);
        setMetaData({ ...metadata, page: event.selected + 1 })
    };

    function deleteProduct(id) {
        let url = `${process.env.REACT_APP_SERVER_URL}/products/${id}`

        axios.delete(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then(res => {
                fetchProducts()
            })

    }

    function addToCart(product) {
        // event.preventPropagation();
        console.log("add to cart", product)
        dispatch(setCart(product))


        /* 
        
            cart_items :[
                {
                    _id:1,
                    quantity:1
                    name,
                    price,
                }
                {
                    _id:2,
                    quantity:4
                }
            ]
        */

    }


    return (
        <>
            {/* <input value={metadata.search_term} onChange={(e) => setSearchTerm(e.target.value)} /> */}
            <div className='row'>
                {
                    products.map(product => {
                        return <div className=" col-md-3 p-3" key={product._id}>
                            <div className='card'>
                                <Link to={`/products/${product._id}`} style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}>
                                    {/* <img src={noImage} className="card-img-top img-thumbnail" alt="..." /> */}
                                    {
                                        product.images.length == 0
                                            ?
                                            <img src={require("../asset/no-image.jpg")} className="card-img-top img-thumbnail" alt="..." />
                                            :
                                            <img src={`${product.images[0]}`} className="card-img-top img-thumbnail" alt="..." />



                                    }
                                    <div className="card-body">
                                        <div>

                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">Rs.{product.price}</p>
                                        </div>

                                    </div>
                                </Link>
                                <BuyerComponent>
                                    <button type='button' className="btn btn-primary"
                                        onClick={() => addToCart(product)}
                                    >Add to cart</button>
                                </BuyerComponent>
                                <SellerComponent>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-around"
                                    }}>

                                        <Link to={`/products/edit/${product._id}`}>
                                            <button type='button' className="btn btn-primary"
                                            >edit</button>
                                        </Link>
                                        <button type='button' className="btn btn-danger"
                                            onClick={() => deleteProduct(product._id)}
                                        >delete</button>
                                    </div>
                                </SellerComponent>
                            </div>
                        </div>
                    })
                }
            </div >
            <div className='pagination-wrapper'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={Math.ceil(metadata.total / metadata.per_page)}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </div>


        </>


    );
}

export default Home;
