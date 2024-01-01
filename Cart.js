import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart({ onClose }) {
    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        );
    }

    let totalPrice = data.reduce((total, food) => {
        return total + food.price;
    }, 0);

    return (
        <div className='modal' style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>Shopping Cart</h5>
                        <button type='button' className='btn-close' aria-label='Close' onClick={onClose}></button>
                    </div>
                    <div className='modal-body'>
                        <table className='table table-hover'>
                        
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td>
                                    <button type='button' className='btn p-0' onClick={() => dispatch({ type: 'REMOVE', index: index })}>
                                        {/* You can add an icon or text here for the delete button */}
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                        </table>
                    </div>
                    <div className='modal-footer'>
                        <h1 className='fs-2'>Total Price: ${totalPrice}/-</h1>
                        <button className='btn bg-success' onClick={onClose}>
                            Check Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
