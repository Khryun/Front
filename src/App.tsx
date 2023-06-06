import './style/css/App.css';
import { message } from "antd";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import axios, { AxiosError } from "axios";
import Header from "./components/MainComponents/Header";
import Footer from "./components/MainComponents/Footer";
import NotFound from "./pages/NotFound";
import loginStore from "./store/LoginStoreClass";
import PersonalAccount from "./pages/PersonalAccount";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
  }
);


axios.interceptors.response.use(
  // в случае валидного accessToken:
  (config) => {
    return config;
  },
  // в случае просроченного accessToken:
  async (error: AxiosError) => {
    if (error.response!.status === 426) {
      localStorage.removeItem("token");
      loginStore.setIsLogin(false);
    }
   
    throw error;
  }
);


const App = observer(() => {
  const [messageApi, contextHolder] = message.useMessage();

  const errorAuth = () => {
    messageApi.open({
      type: "error",
      content: "Вы не авторизованы!",
    });
  }


  const successAuth = () => {
    messageApi.open({
      type: "success",
      content: "Вы были авторизованы!",
    });
  }


  useEffect(() => {
    if (loginStore.isLogin) {
      successAuth();
    }
    else {
      errorAuth();
    }
  }, [loginStore.isLogin])


  return (
    <div className="App">
      {contextHolder}
      <header className="header">
        <Header />
      </header>
      <main className="main">
        <div className="main_wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/personal_account" element={<PersonalAccount />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  )
});


export default App;