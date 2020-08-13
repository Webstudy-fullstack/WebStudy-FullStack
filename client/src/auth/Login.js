
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
const Login = ({ setHasCookie }) => {
const [ userId, setUserId ] = useState('');
const [ userPw, setUserPw ] = useState('');

const handleSubmit = async (e) => {
e.preventDefault();
if (!userId || !userPw) {
return;
}
try {
        let url='http://localhost:4000/users/logged_in';
        let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                email: userId,
                password: userPw
            }
        };
        let response = await axios(options);
        console.log(response.statusText);
if (response.statusText === 'OK') {
setHasCookie(true);
} 
}
 catch (err) {
alert('로그인에 실패했습니다.');
setUserId('');
setUserPw('');
console.error('login error', err);
}
};
return (
<div>
<h2>Login</h2>
<form
onSubmit={handleSubmit}
>
<input
type="email"
name="user_id"
value={userId}
onChange={e => setUserId(e.target.value)}
placeholder="id"
/>
<input
type="password"
name="user_pw"
value={userPw}
onChange={e => setUserPw(e.target.value)}
placeholder="pw"
/>
<button
type="submit"
>
Login
</button>
</form>
<Link
to="/join"
>
회원가입
</Link>
</div>
);
};
export default Login;

