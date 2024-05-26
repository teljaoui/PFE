import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { BsCartXFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartAction } from '../config/Action';


export default function Cart() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const carts = useSelector((data) => data.carts);


    const dispatch = useDispatch();

    const [total, setTotal] = useState(0);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteCartAction(id));
        }
    };


    const calculateTotal = () => {
        let totalPrice = 0;
        carts.forEach((product) => {
            totalPrice += product.ProductQuantity * product.ProductPrice;
        });
        return totalPrice;
    };

    const handleQuantityChange = (index, newValue) => {
        const updatedCarts = [...carts];
        updatedCarts[index].ProductQuantity = newValue;
        setTotal(calculateTotal(updatedCarts));
    };

    return (
        <>
            <Meta title={"Cart"} />
            <BreadCrumb title="Your Shopping Cart" />

            <section className="cart-wrapper home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            {carts.length === 0 ? (
                                <div className="cart-empty">
                                    <BsCartXFill className="cart-icon" />
                                    <p>Can't find any items? Continue shopping to discover more</p>
                                </div>
                            ) : (
                                <table className="cart-items">
                                    <thead>
                                        <tr>
                                            <th className="w-50">product</th>
                                            <th>price</th>
                                            <th>quantity</th>
                                            <th>total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carts.map((product, index) => (
                                            <tr key={product.id}>
                                                <td className="w-50 gap-10">
                                                    <img src={`http://127.0.0.1:8000/${product.ProductImage} `} width={80} alt="" />
                                                    <p>
                                                        {product.ProductTitle.length > 20 ? product.ProductTitle.substring(0, 20) + '...' : product.ProductTitle}
                                                    </p>
                                                </td>
                                                <td>
                                                    <span>${product.ProductPrice}</span>
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        name=""
                                                        id=""
                                                        min={1}
                                                        value={product.ProductQuantity}
                                                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                                        className="form-control"
                                                    />
                                                </td>
                                                <td className="d-flex gap-10">
                                                    <span>$ {product.ProductQuantity * product.ProductPrice}</span>
                                                </td>
                                                <td>
                                                    <RiDeleteBin5Fill className="delete-icon" onClick={() => handleDelete(product.id)} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                        {carts.length > 0 && (
                            <div className="col-12 py-4 d-flex justify-content-between">
                                <div>
                                    <Link to="/store" className="buttonbg">Continue Shopping</Link>
                                </div>
                                <div className=" d-flex flex-column justify-content-between">
                                    <p className="subtotal">Subtotal &nbsp;&nbsp;&nbsp; <span> $ {calculateTotal()}</span></p>
                                    <Link to="/checkout" className="button text-center">Check Out</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
