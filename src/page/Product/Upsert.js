import axios from 'axios';
import Reac, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Upsert = () => {

    const { id } = useParams();

    const [product, setProduct] = useState({
        name: "",
        price: "",
        images: [],
        categories: ["one"]
    })

    useEffect(() => {
        if (id) {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/products/${id}`)
                .then(res => {
                    setProduct(res.data.data)
                })
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();


        let form_data = new FormData();
        form_data.append("name", product.name)
        form_data.append("price", product.price)
        form_data.append("categories[]", "one")
        form_data.append("categories[]", "two")

        /* 
            categories = [one, two]
        */

        let temp = [...product.images]
        temp.forEach(img => {

            if (typeof (img) == "string") {
                form_data.append("images[]", img)
            }else{
                form_data.append("images", img)
            }

        })

        let method = "post"
        let url = `${process.env.REACT_APP_SERVER_URL}/products`
        if (id) {
            method = "put"
            url = `${process.env.REACT_APP_SERVER_URL}/products/${id}`

        }

        axios[method](url, form_data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then(user_res => {
                console.log({ user_res })
                //   dispatch(setUser(user_res.data))
            }).catch(err => {
                console.log(err)
            })
    }

    const handlechange = (event) => {
        if (event.target.type == "file") {
            setProduct({
                ...product,
                images: [...product.images, ...event.target.files]
            })
        } else {
            setProduct({ ...product, [event.target.name]: event.target.value })
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="text" class="form-control" id="" name="name" value={product.name} onChange={handlechange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Price</label>
                    <input type="number" class="form-control" id="" name='price' value={product.price} onChange={handlechange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Categories</label>
                    <button type='button'>add category</button>

                    {
                        product.categories.map((category, idnex) => {
                            return <input type="tesxt" class="form-control" id="" name='price' value={category} onChange={handlechange} />
                        })
                    }
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">description</label>
                    <textarea className='form-control' value={product.description} onChange={handlechange} name="description" >
                        {product.price}
                    </textarea>

                    <input type="number" class="form-control" id="" name='price' value={product.price} onChange={handlechange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">image</label>
                    <hr />
                    {
                        product.images.map(image => {
                            let src = "";
                            if (typeof (image) == "string") {
                                src = image
                            } else {
                                src = URL.createObjectURL(image)
                            }

                            return <img src={src}
                                style={{
                                    height: "150px",
                                    width: "150px",
                                    margin: "10px"
                                }}
                            />
                        })
                    }
                    <hr />
                    <input type="file" multiple class="form-control" id="" name='images' onChange={handlechange} />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Upsert;
