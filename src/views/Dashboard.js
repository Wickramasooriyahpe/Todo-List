import React from 'react';
import './dashboard.css'
import Tasks from '../components/Tasks/tasks';
import Menubar from '../components/Navigationbar/navigation';

const Dashboard = () => {
    return (
        <div className="container">
             <Menubar></Menubar>
           <div className="list-container">
                <header className="header">
                    <h1>Todo List</h1>
                </header>
                <Tasks />
           </div>                
        </div>
    );
};

export default Dashboard;