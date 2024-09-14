import React from "react";
import { Tabs } from "antd";
import "../auth/tabComponent.css"
import Register from "./Register";
import Login from "./signin";

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Sign in",
    children: <Login />,
  },
  {
    key: "2",
    label: "Sign up",
    children: <Register />,
  },
];
const TabComponent = () => (
  <div className="tab-container">
  <Tabs
    defaultActiveKey="1"
    items={items}
    onChange={onChange}
    className="col"
  />
  </div>
);
export default TabComponent;
