import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseInput from '../components/UseInput'
// import * as Input from '../components/Input';
import {apis} from '../shared/axios'

const Register = () => {
  const [user,setUser] = useState({
    id:"",
    password:"",
  });

  const changeInputHandler = (event) => {
    const {value,name} = event.target;
    setUser(old => {
      return {...old, [name]:value};
    })
  };

  const submitBtnHandler = async (e) => {
    e.preventDefault();
    //post 요청 보내기
   const result = await apis.post('/register', user)
    console.log(result.data);
  };

  const navi = useNavigate();

  return (
  <div>
    회원가입
    <form onSubmit={submitBtnHandler}>
    <UseInput type="text" 
    value={user.id}
    name='id'
    onChange={changeInputHandler}
    placeholder='id 입력하세요'
    />

    <UseInput type="text" 
    value={user.password}
    name='password'
    onChange={changeInputHandler}
    placeholder='password 입력하세요'
    />

    <button>회원가입 완료</button>
    <button
      type="button"
      onClick={()=> {
      navi('/')
    }}>로그인하러 가기</button>
    </form>
  </div>
  );
};

export default Register;
