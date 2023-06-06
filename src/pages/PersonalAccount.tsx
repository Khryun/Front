import { observer } from "mobx-react";
import { Navigate } from "react-router-dom";
import PAWorker from "./personalAccounts/PAWorker";
import PAManager from "./personalAccounts/PAManager";
import loginStore from "../store/LoginStoreClass";
import PAControl from "./personalAccounts/PAControl";
import PAAnalyst from "./personalAccounts/PAAnalyst";
import PAAdmin from "./personalAccounts/PAAdmin";


const PersonalAccount = observer(() => {

  if (!loginStore.isLogin) {
    return <Navigate to="/auth" />
  }

  if (loginStore.user!.post === "Менеджер") {
    return (
      <div className="personal_account_page">
        <PAManager />
      </div>
    )
  }

  if (loginStore.user!.post === "Управляющий") {
    return (
      <div className="personal_account_page">
        <PAControl/>
      </div>
    )
  }

  if (loginStore.user!.post === "Аналитик") {
    return (
      <div className="personal_account_page">
        <PAAnalyst />
      </div>
    )
  }

  if (loginStore.user!.post === "Администратор") {
    return (
      <div className="personal_account_page">
        <PAAdmin />
      </div>
    )
  }

  return (
    <div className="personal_account_page">
      <PAWorker />
    </div>
  )
});


export default PersonalAccount;