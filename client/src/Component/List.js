import React, { useState } from 'react';

export default function List(props) {
  return (
    <div>
      <h1>List</h1>
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
    </div>
  );
}
