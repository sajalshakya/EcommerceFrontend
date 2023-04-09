import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import BuyerComponent from '../../component/BuyerComponent';

const Show = () => {
    const { id } = useParams()

    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate();

    const [product, setProduct] = useState({});
    const [review, setReview] = useState({
        rating: 0,
        comment: ""
    });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/products/${id}`)
            .then(res => {
                setProduct(res.data.data)
            })
    }, []);

    if (!product._id) {
        return <>Loading....</>
    }


    const brands_mapping = product.brands?.map(brand => {
        return <span class="badge bg-secondary mx-2">{brand}</span>
    })
    const categories_mapping = product?.categories?.map(brand => {
        return <span class="badge bg-secondary mx-2">{brand}</span>
    })

    const updateReview = (e) => {
        e.preventDefault();

        // check if looged in , else redirect
        checkAuth();

        console.log("update review");
    }

    const checkAuth = () => {
        if (!user) {
            navigate("/login")
        }
    }

    const addToCart = () => {

        checkAuth();
        // check if looged in , else redirect

        console.log("add to cart");
    }

    return (
        <div>
            {id}
            <div className='row'>
                <div className='col-md-6'>
                    {/* {
                        JSON.stringify(product.images)
                    } */}
                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="http://res.cloudinary.com/dtv8dtpkm/image/upload/v1668254736/neyp5bi9urkncemhwjyn.jpg" class="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="http://res.cloudinary.com/dtv8dtpkm/image/upload/v1668254736/neyp5bi9urkncemhwjyn.jpg" class="d-block w-100" alt="..." />
                            </div>

                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>



                </div>
                <div className='col-md-6'>
                    <p>name: {product.name}</p>
                    <p>price: ${product.price}</p>
                    <p>brands: {brands_mapping}</p>
                    <p>categories: {categories_mapping}</p>
                    <p>in_stock: {product.in_stock}</p>
                    <p>description: {product.description}</p>
                    <hr />
                    <BuyerComponent>
                        <button onClick={addToCart}>add to cart</button>
                    </BuyerComponent>
                </div>
            </div>
            <hr />
            <div>
                <h2>Reviews</h2>
                {
                    product.reviews.length == 0
                        ?
                        <p>No reviews yet.</p>
                        :
                        product.reviews.map(review => {
                            return <>
                                review
                            </>
                        })
                }
                <hr />
                <BuyerComponent>
                    <form onSubmit={updateReview}>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Rating *</label>
                            <input min={1} max={5} className="form-control" />
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">comment</label>
                            <textarea className='form-control'>{review.comment}</textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </BuyerComponent>


            </div>


        </div>
    );
}

export default Show;
