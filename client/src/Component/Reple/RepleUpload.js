import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function RepleUpload({ postInfo }) {
  const user = useSelector((state) => state.user);
  const [reple, setReple] = useState('');
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    if (!reple) {
      alert('댓글을 써주세요');
      return;
    }
    let body = {
      postid: postInfo._id,
      uid: user.uid,
      reple: reple,
    };

    axios.post('/api/reple/submit', body).then((res) => {
      if (res.data.success) {
        alert('댓글을 저장했습니다.');
        setReple('');
        navigate(`/post/${postInfo.postNum}`);
      }
    });
  };
  return (
    <div>
      <form>
        <label htmlFor='content'>내용</label>
        <textarea
          id='content'
          type='text'
          value={reple}
          onChange={(event) => setReple(event.currentTarget.value)}
        />
        <Button onClick={(e) => submitHandler(e)}>전송</Button>
      </form>
    </div>
  );
}
