import '../style/css/auth/auth.css';
import { AuthForm } from "../components/AuthForm";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { Button, message } from "antd";


const Auth = observer(() => {
  return (
    <div className="auth_page">
      <h1 className="auth_header title--border"> Авторизация </h1>
      <div className="auth_form">
        <AuthForm />
      </div>
    </div>
  )
})


export default Auth;