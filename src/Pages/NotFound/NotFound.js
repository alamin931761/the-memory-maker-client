import React from 'react';
import notfound from '../../images/notfound.jpg'
import PageTitle from '../Shared/PageTitle/PageTitle';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const NotFound = () => {
    return (
        <div className='common-styles' data-aos="fade-up" data-aos-duration="1000">
            <PageTitle title="404"> </PageTitle>
            <img className='img-fluid' src={notfound} alt="" />
            <div className='mt-3 d-flex justify-content-center'>
                <Link to="/" className='btn btn-outline-dark common-link'><BsArrowLeft /> Back to Home</Link>
            </div>
        </div>
    );
};

export default NotFound;