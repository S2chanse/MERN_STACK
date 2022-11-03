import React, { useState } from 'react';
import LoginDiv from '../../Styled/UserCSS';
import firebase from '../../FireBase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();
  const RegisterFnc = async (e) => {
    setFlag(true);
    e.preventDefault();
    if (!(name || email || password || pwConfirm)) {
      alert('모든 값을 채워주세요.');
      return;
    }
    if (password.length < 9) {
      alert('비밀번호는 최소 9글자 이상 입력해주세요.');
      return;
    }
    if (password !== pwConfirm) {
      alert('비밀번호가 같지 않습니다.');
      return;
    }
    try {
      let createUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await createUser.user.updateProfile({ displayName: name });

      console.log(createUser.user);
      let body = {
        email: createUser.user.multiFactor.user.email,
        displayName: createUser.user.multiFactor.user.displayName,
        uid: createUser.user.multiFactor.user.uid,
      };
      const res = await axios.post('api/user/register', body);
      setFlag(false);
      if (res.data.success) {
        //회원가입 성공 시
        alert('회원가입에 성공했습니다');
        navigate('/login');
      } else {
        alert('회원가입에 실패했습니다');
      }
    } catch (error) {
      console.error(error);
    }
  };
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
          minLength={8}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <input
          type='password'
          placeholder='비밀번호 확인'
          minLength={8}
          onChange={(e) => setPwConfirm(e.currentTarget.value)}
        />
        <button disabled={flag} onClick={(e) => RegisterFnc(e)}>
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
}
