import React from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar/Sidebar';
import PageTitle from '../Shared/PageTitle/PageTitle';

const Dashboard = () => {
    return (
        <div className='vh-100 common-styles'>
            <PageTitle title="Dashboard"></PageTitle>
            <div className='d-flex align-items-center'>
                <Sidebar />
                <h2 className='title-margin'>Dashboard</h2>
            </div>

            <div className='h-100 d-flex justify-content-center align-items-center'>
                <h2>Welcome to the Dashboard</h2>
            </div>
        </div >
    );
};

export default Dashboard;