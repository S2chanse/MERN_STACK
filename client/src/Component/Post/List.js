import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function List({ contentList, setContentList }) {
  useEffect(() => {
    axios
      .post('/api/post/list')
      .then((res) => {
        if (res.data.success) {
          let postList = res.data.postList;
          setContentList(postList);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>List</h1>
      {contentList.map((content, idx) => {
        console.log(content);
        return (
          <Link
            to={`/post/${content.postNum}`}
            key={idx}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <div
              id={content.postNum}
              style={{
                width: '100%',
                marginLeft: '1rem',
              }}
            >
              <h2>{content.title}</h2>
              <h5>{content.author.displayName}</h5>
              <h3>{content.content}</h3>
              <hr />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
