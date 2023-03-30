import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UseInput from '../components/UseInput'
import { apis } from "../shared/axios";
import { cookies } from "../shared/cookie";
// import * as Input from '../components/Input';

const Login = () => {
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

  const navi = useNavigate();

  const submitBtnHandler = async (e) => {
    e.preventDefault();
    //post 요청 보내기

    try{
      const result = await apis.post('/login', user)
      cookies.set("token", result.data.token, {path:"/"})
      navi('/home')
  }
    catch (error) {
      alert('로그인 실패')
    }
  };

  // 쿠키가 있는지 확인
  // 쿠키가 있으면 Home으로 보냄

  // 가드
  useEffect(()=> {
    const token = cookies.get("token");
    if (token) {
      navi('/home')
    }
  },[])

  return (
  <div>
    로그인
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

    <button>로그인</button>
    </form>
  </div>
  );
};

export default Login;
