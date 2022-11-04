import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Detail({ postInfo }) {
  let params = useParams();
  const naviagte = useNavigate();
  const user = useSelector((state) => state.user);
  /** 삭제 fnc **/
  const deleteRow = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        const res = await axios.post('/api/post/delete', params);
        if (res.data.success) {
          alert('삭제가 완료됐습니다.');
          naviagte('/');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <h1>{postInfo.title}</h1>
      <h3>{postInfo.author.displayName}</h3>
      {postInfo.image ? (
        <img
          src={`http://localhost:5000/${postInfo.image}`}
          alt='이미지'
          style={{ width: '100px', height: '100px' }}
        />
      ) : null}
      <h3>{postInfo.content}</h3>
      {user.uid === postInfo.author.uid && (
        <>
          <Link to={`/edit/${postInfo.postNum}`}>
            <button> 수정 </button>
          </Link>
          <button
            onClick={() => {
              deleteRow();
            }}
          >
            삭제
          </button>
        </>
      )}
    </div>
  );
}
