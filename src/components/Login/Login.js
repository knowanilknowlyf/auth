import React, { useContext, useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
const emailReducer = (state, action) => {
  if (action.type == 'USER_INPUT') {
    return { value: action.value, isValid: action.value.includes('@') }

  }
  else if (action.type == 'VALIDATE_EMAIL') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }

}
const passwordReducer = (state, action) => {
  if (action.type == 'USER_INPUT') {
    return { value: action.value, isValid: action.value.trim().length > 6 }

  }
  else if (action.type == 'VALIDATE_PASSWORD') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }

}
const Login = (props) => {
  const ctx=useContext(AuthContext)
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: false })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: false })

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     )
  //     console.log('iu')
  //   }, 500)
  //   return () => {
  //     console.log('cu')
  //     clearTimeout(identifier)
  //   }
  // }, [enteredEmail, enteredPassword])
  const emailChangeHandler = (event) => {
    dispatchEmail({ value: event.target.value, type: 'USER_INPUT' })
    // setEnteredEmail(event.target.value);
    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    )
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:'USER_INPUT',value:event.target.value})
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    )
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'VALIDATE_EMAIL' })
    // emailState.isValid
    // setEmailIsValid(emailState.value.includes('@'));
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'VALIDATE_PASSWORD' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
