import React from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useAuth();  
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();  
    navigate('/'); 
  };

  return (
    <div>
      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button> 
      </form>
    </div>
  );
};

export default Logout;
