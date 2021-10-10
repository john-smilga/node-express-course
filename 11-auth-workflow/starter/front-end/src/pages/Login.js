import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory, Redirect } from 'react-router-dom';
import FormRow from '../components/FormRow';
import { useGlobalContext } from '../context';
import useLocalState from '../utils/localState';

import axios from 'axios';

function Login() {
  const { saveUser } = useGlobalContext();
  const history = useHistory();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    hideAlert();
    setLoading(true);
    const { email, password } = values;
    const loginUser = { email, password };
    try {
      const { data } = await axios.post(`/api/v1/auth/login`, loginUser);
      setValues({ name: '', email: '', password: '' });
      showAlert({
        text: `Welcome, ${data.user.name}. Redirecting to dashboard...`,
        type: 'success',
      });
      setLoading(false);
      saveUser(data.user);
      history.push('/dashboard');
    } catch (error) {
      showAlert({ text: error.response.data.msg });
      setLoading(false);
    }
  };

  return (
    <>
      <Wrapper className='page'>
        {alert.show && (
          <div className={`alert alert-${alert.type}`}>{alert.text}</div>
        )}
        <form
          className={loading ? 'form form-loading' : 'form'}
          onSubmit={onSubmit}
        >
          {/* single form row */}
          <FormRow
            type='email'
            name='email'
            value={values.email}
            handleChange={handleChange}
          />
          {/* end of single form row */}
          {/* single form row */}
          <FormRow
            type='password'
            name='password'
            value={values.password}
            handleChange={handleChange}
          />
          {/* end of single form row */}
          <button type='submit' className='btn btn-block' disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          <p>
            Don't have an account?
            <Link to='/register' className='register-link'>
              Register
            </Link>
          </p>
          <p>
            Forgot your password?{' '}
            <Link to='/forgot-password' className='reset-link'>
              Reset Password
            </Link>
          </p>
        </form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  .alert {
    margin-top: 3rem;
  }
  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    text-align: center;
  }
  .btn {
    margin-bottom: 1.5rem;
  }
  .register-link,
  .reset-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-500);
    cursor: pointer;
  }
  .reset-link {
    margin-top: 0.25rem;
  }
  .btn:disabled {
    cursor: not-allowed;
  }
`;

export default Login;
