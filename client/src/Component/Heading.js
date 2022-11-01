import React from 'react';
import { Link, Outlet } from 'react-router-dom';
export default function () {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <h1>Hello, React!!</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '50%',
        }}
      >
        <Link to='/list'>Home</Link>
        <Link to='/upload'>Upload</Link>
      </div>
    </div>
  );
}
