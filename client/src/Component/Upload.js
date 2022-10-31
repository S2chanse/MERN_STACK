import React, { useState, useEffect } from 'react';

export default function Upload(props) {
  const [contents, setContents] = useState('');
  useEffect(() => {
    //Component mount 나타날때
    console.log(contents);

    //조건
    //state값이 들어간다.
  }, [contents]);
  /*
  1.첫번째 인자 : 변수의 이름
  2.두번째 인자 : 인자의 상태 변화 
  3.초기값
  state의 값이 바껴도, 화면을 재 호출할 필요가 없다.

  state의 값을 바꿀 때는 항상 setState를 사용한다.
  */

  const onSubmit = () => {
    let arr = [...props.contentList];
    arr.push(contents);
    props.setContentList([...arr]);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <input
        type='text'
        value={contents}
        onChange={(event) => setContents(event.currentTarget.value)}
      />
      <button style={{ marginTop: '1rem' }} onClick={() => onSubmit()}>
        제출
      </button>
    </div>
  );
}
