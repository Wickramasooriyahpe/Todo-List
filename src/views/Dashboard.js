import React from 'react';
import './dashboard.css'
import Tasks from '../components/Tasks/tasks';
import Menubar from '../components/Navigationbar/navigation';
import Progress from '../components/taskProgress/taskProgress';

const Dashboard = () => {
    return (
        <div className="container">
             <Menubar></Menubar>
           <div className="list-container">
                <div className="left-side">
                    <Progress/>
                </div>
                <div className="right-side">
                    <header className="header">
                        <h2>Todo List</h2>
                    </header>
                    <Tasks />
                </div>
            </div>
        </div>

    );
};

export default Dashboard;