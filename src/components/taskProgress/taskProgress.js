import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { Card } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import "../taskProgress/taskProgress.css";

function Progress() {
    const { user } = useAuth();
    const [completed, setCompleted] = useState(0);

    const updateCount = () => {
        const count = localStorage.getItem("completed");
        if (count) {
            setCompleted(parseInt(count, 10)); 
        }
    };

    useEffect(() => {
        updateCount(); 
        const interval = setInterval(updateCount, 1000); 

        return () => clearInterval(interval); 
    }, []);

    return (
        <div className="progress">
            <div>
             <div className="card-wrapper">
                <Card className="card">
                    <div className="card-content">
                        <div className="text-content">
                                <h2>Welcome!</h2>
                            <p>Well done, you have completed {completed} tasks.</p>
                        </div>
                        <div className="icon-content">
                            <span className="icon-wrapper">
                                <CheckOutlined className="icon" />
                            </span>
                        </div>
                    </div>
                </Card>
             </div>
            </div>
        </div>
    );
}

export default Progress;
