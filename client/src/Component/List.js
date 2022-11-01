import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default function List(props) {
  const [text, setText] = useState('');
  useEffect(() => {
    let body = {
      text: 'hello',
    };
    axios
      .post('/api/test', body)
      .then((response) => {
        alert('연결성공');
        let data = response.data;
        console.log(data);
        setText(data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>List {text}</h1>
      {props.contentList.map((content, idx) => {
        return (
          <div
            key={idx}
            style={{
              width: '100%',
              marginLeft: '1rem',
            }}
          >
            <h2>{content}</h2>
            <hr />
          </div>
        );
      })}
      <Button>Test</Button>
    </div>
  );
}
