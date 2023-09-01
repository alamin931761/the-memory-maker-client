import React, { useEffect, useState } from 'react';
import './CustomerReviews.css';
import { BsPeopleFill } from 'react-icons/bs';
import CustomerReview from './CustomerReview/CustomerReview';

const CustomerReviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [reviews])
    return (
        <div>
            <h1 className='text-center mt-5 fw-bold second-font'><BsPeopleFill className='mb-1' /> Love from customers! <BsPeopleFill className='mb-1' /></h1>

            <div className='reviews'>
                {
                    reviews.map(data => <CustomerReview key={data._id} data={data}></CustomerReview>)
                }
            </div>
        </div>
    );
};

export default CustomerReviews;