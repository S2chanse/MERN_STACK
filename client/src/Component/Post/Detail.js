import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

export default function Detail() {
  let params = useParams();
  const [postInfo, setPostInfo] = useState({});
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    axios
      .post("/api/post/detail", { postNum: params.postNum })
      .then((res) => {
        if (res.data.success) {
          setPostInfo(res.data.post);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setFlag(true);
  }, [flag]);

  return (
    <div>
      {flag ? (
        <div>
          <h1>{postInfo.title}</h1>
          <h3>{postInfo.content}</h3>
        </div>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}
