import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SiCodechef } from 'react-icons/si';
import useLocalStorage from '../../hooks/useLocalStorage';
import isEmailValid from '../../utils/isEmailValid';
import { FormContainer, LoginPageContainer } from './styles';

export default function LoginForm() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [, setUser] = useLocalStorage('user');
  const [, setMealsToken] = useLocalStorage('mealsToken');
  const [, setCocktailsToken] = useLocalStorage('cocktailsToken');
  const history = useHistory();

  function isLoginValid() {
    const minPasswordLength = 6;
    const isUserEmailValid = isEmailValid(userEmail);
    const isUserPasswordValid = userPassword.length > minPasswordLength;

    return isUserEmailValid && isUserPasswordValid;
  }

  function handleEmailInputChange({ target }) {
    const { value } = target;
    setUserEmail(value);
  }

  function handlePasswordInputChange({ target }) {
    const { value } = target;
    setUserPassword(value);
  }

  function handleLoginButton() {
    setUser({ email: userEmail });
    setMealsToken(1);
    setCocktailsToken(1);
    history.push('/foods');
  }

  return (
    <LoginPageContainer>
      <FormContainer>
        <SiCodechef color="#f00" size={ 90 } className="login-chef" />
        <h1>
          Code
          <span>Chef</span>
        </h1>
        <input
          placeholder="Email"
          type="text"
          data-testid="email-input"
          onChange={ handleEmailInputChange }
        />
        <input
          placeholder="Password"
          type="password"
          data-testid="password-input"
          onChange={ handlePasswordInputChange }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !isLoginValid() }
          onClick={ handleLoginButton }
        >
          Enter
        </button>
      </FormContainer>
    </LoginPageContainer>
  );
}
