import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { apis } from '../shared/axios';
import { cookies } from '../shared/cookie'

function Home() {
  const navi = useNavigate();

  const removeBtnHandler = () => {
    cookies.remove("token")
    navi('/')
  };

  // 백 가드
  const checkToken = () => {
    const token = cookies.get("token");
    try{
      apis.get("/user",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })}
    catch(error) {
      alert('비정상적인 접근입니다!')
      navi('/')
    }
  };

  // 프론트 가드
  useEffect(()=> {
    const token = cookies.get("token")
    if (!token) {
      navi('/')
    }
    checkToken();
  },[])

  return (
    <div>
      <button onClick={removeBtnHandler}>로그아웃</button>
    </div>
  )
}

export default Home