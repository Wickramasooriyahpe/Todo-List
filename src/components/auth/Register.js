import React from "react";
import { Form, Input, Button, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, authError } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: (values) => {
      const isSuccess = register(values.username, values.email, values.password);
      if (isSuccess) {
        message.success('Registration successful!');
        navigate('/dashboard');
      } else {
        message.error('Registration failed. Please try again.');
      }
    },
  });

  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={formik.handleSubmit} className="auth-form">
        <Form.Item
          label="Name"
          validateStatus={formik.errors.username && formik.touched.username ? "error" : ""}
          help={formik.touched.username && formik.errors.username ? formik.errors.username : ""}
        >
          <Input
            id="username"
            name="username"
            placeholder="Name"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          validateStatus={formik.errors.email && formik.touched.email ? "error" : ""}
          help={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
        >
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          validateStatus={formik.errors.password && formik.touched.password ? "error" : ""}
          help={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
        >
          <Input.Password
            id="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Register
        </Button>

        {authError && <p className="error-message">{authError}</p>}
      </Form>
    </div>
  );
};

export default Register;

