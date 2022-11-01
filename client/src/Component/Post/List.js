import React, { useEffect, useState } from "react";
import axios from "axios";

export default function List({ contentList, setContentList }) {
  useEffect(() => {
    axios
      .post("/api/post/list")
      .then((res) => {
        console.log(res);
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
        return (
          <div
            key={content._id}
            style={{
              width: "100%",
              marginLeft: "1rem",
            }}
          >
            <h2>{content.title}</h2>
            <h3>{content.content}</h3>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
