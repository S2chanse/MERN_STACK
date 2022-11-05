import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import List from "./List";

export default function Main() {
  const user = useSelector((state) => state.user);
  const [contentList, setContentList] = useState([]);
  useEffect(() => {
    axios
      .post("/api/post/list")
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
      <List contentList={contentList} />
    </div>
  );
}
