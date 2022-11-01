import React, { useState, useEffect } from 'react';
import { UploadDiv, UploadForm, UploadButtonDiv } from '../../Styled/UploadCSS';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Upload(props) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  let navigator = useNavigate();

  /*
  1.첫번째 인자 : 변수의 이름
  2.두번째 인자 : 인자의 상태 변화 
  3.초기값
  state의 값이 바껴도, 화면을 재 호출할 필요가 없다.

  state의 값을 바꿀 때는 항상 setState를 사용한다.
  */

  const onSubmit = (e) => {
    e.preventDefault();
    if (title === '' || content === '') {
      alert('모든 항목을 채워주세요');
      return;
    }

    axios
      .post('/api/post/submit', { title, content })
      .then((res) => {
        if (res.data.success) {
          alert('전송이 완료됐습니다.');
          navigator('/');
        } else {
          alert('글 작성에 실패했습니다');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor='label'>제목</label>
        <input
          id='label'
          type='text'
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <label htmlFor='content'>내용</label>
        <textarea
          id='content'
          type='text'
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
        />
        <UploadButtonDiv>
          <button onClick={(e) => onSubmit(e)}>제출</button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
}
