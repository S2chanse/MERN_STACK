import React, { useState } from "react";
import LoginDiv from "../../Styled/UserCSS";
import firebase from "../../FireBase";
import { async } from "@firebase/util";

export default function () {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const RegisterFnc = async (e) => {
    e.preventDefault();
    if (!(name || email || password || pwConfirm)) {
      alert("모든 값을 채워주세요.");
      return;
    }

    if (password !== pwConfirm) {
      alert("비밀번호가 같지 않습니다.");
      return;
    }
    let createUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await createUser.user.updateProfile({ displayName: name });

    console.log(createUser.user);
  };
  return (
    <LoginDiv>
      <form>
        <input
          type="name"
          placeholder="이름"
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <input
          type="email"
          placeholder="이메일"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          onChange={(e) => setPwConfirm(e.currentTarget.value)}
        />
        <button onClick={(e) => RegisterFnc(e)}>회원가입</button>
      </form>
    </LoginDiv>
  );
}
