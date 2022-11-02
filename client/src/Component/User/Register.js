import React, { useState } from 'react';
import LoginDiv from '../../Styled/UserCSS';
export default function () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <LoginDiv>
      <form>
        <input
          type='name'
          placeholder='이름'
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <input
          type='email'
          placeholder='이메일'
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type='password'
          placeholder='비밀번호'
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <input
          type='password'
          placeholder='비밀번호 확인'
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button>회원가입</button>
      </form>
    </LoginDiv>
  );
}
