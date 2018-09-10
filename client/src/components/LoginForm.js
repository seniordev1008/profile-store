import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import contactService from '../services/contacts';
import authService from '../services/auth';
import storageService from '../utils/localStorageHelpers';

import { Form, Button, Icon, Header } from 'semantic-ui-react';

const LoginForm = ({ setUser }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const { email, password } = credentials;

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.login(credentials);
      setUser(user);
      contactService.setToken(user.token);
      storageService.saveUser(user);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Input
        required
        placeholder="For ex. abc@example.com"
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={handleOnChange}
        icon="at"
        iconPosition="left"
      />
      <Form.Input
        required
        placeholder="Password must have minimum characters of 6."
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={handleOnChange}
        icon="lock"
        iconPosition="left"
      />

      <Button
        animated="vertical"
        color="teal"
        icon
        labelPosition="left"
        type="submit"
        floated="right"
        size="large"
      >
        <Icon name="sign-in" />
        Login
      </Button>
      <Header as="h4">
        Don't have an account? <Link to="/register">Register.</Link>
      </Header>
    </Form>
  );
};

export default LoginForm;
