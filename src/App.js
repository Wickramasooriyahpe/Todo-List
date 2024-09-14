import "./App.css";
import "../src/components/Navigationbar/navigation";
import "../src/views/Dashboard";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from "react";
import { AuthProvider } from "./components/auth/AuthContext";
import Dashboard from "../src/views/Dashboard";
import TabComponent from "./components/auth/tabComponent";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<TabComponent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
export default App;
