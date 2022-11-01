import styled from '@emotion/styled';

const UploadDiv = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const UploadForm = styled.form`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  width: 80%;
  input {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    &:active,
    &:focus {
      outline: none;
    }
  }
  textarea {
    min-height: 350px;
    resize: none;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    &:active,
    &:focus {
      outline: none;
    }
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: grey;
      border-radius: 15px;
      background-clip: padding-box;
      border: 1px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: #c6c6c6;
      border-radius: 15px;
      box-shadow: inset 0px 0px 5px whitesmoke;
    }
  }
  label {
    font-weight: bold;
    &:hover {
      color: white;
    }
  }
`;
const UploadButtonDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  button {
    border-radius: 15px;
    padding: 5px 10px;
    background-color: black;
    color: white;
    border: none;
    &:hover {
      background-color: white;
      color: black;
      border: 1px solid black;
    }
  }
`;

export { UploadDiv, UploadForm, UploadButtonDiv };