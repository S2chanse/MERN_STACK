import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function RepleList({ postInfo }) {
  const [repleList, setRepleList] = useState([]);
  useEffect(() => {
    axios
      .post('/api/reple/getRepleList', {
        postid: postInfo._id,
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res);
          setRepleList([...res.data.repleList]);
        }
      });
  }, []);

  return (
    <div>
      {repleList.map((reple, idx) => {
        return <div key={idx}>{reple.reple}</div>;
      })}
    </div>
  );
}
