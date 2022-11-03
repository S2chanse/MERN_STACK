import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

export default function Detail() {
  let params = useParams();
  const naviagte = useNavigate();
  const [postInfo, setPostInfo] = useState({});
  const user = useSelector((state) => state.user);
  useEffect(() => {
    axios
      .post('/api/post/detail', { postNum: params.postNum })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.post.author);
          setPostInfo(res.data.post);
        }
      })
      .catch((err) => console.error(err));
  }, []);
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
      {postInfo.author ? (
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
      ) : (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}
    </div>
  );
}
