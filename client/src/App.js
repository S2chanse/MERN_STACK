import React, { useState } from 'react';
import './App.css';
import Heading from './Component/Heading';
import { Route, Routes } from 'react-router-dom';
import List from './Component/Post/List';
import Upload from './Component/Post/Upload';
import Detail from './Component/Post/Detail';
import Edit from './Component/Post/Edit';

function App() {
  const [contentList, setContentList] = useState([]);
  return (
    <div>
      <Heading />
      <Routes>
        <Route
          path='/'
          element={
            <List contentList={contentList} setContentList={setContentList} />
          }
        />
        <Route
          path='/upload'
          element={
            <Upload contentList={contentList} setContentList={setContentList} />
          }
        />
        <Route path='/post/:postNum' element={<Detail />} />
        <Route path='/edit/:postNum' element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
