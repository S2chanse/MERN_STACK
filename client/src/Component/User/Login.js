import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginDiv from '../../Styled/UserCSS';
export default function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  return (
    <LoginDiv>
      <form>
        <input
          type='email'
          placeholder='아이디'
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type='password'
          placeholder='비밀번호'
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button>로그인</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate('/register');
          }}
        >
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
}
