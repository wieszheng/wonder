import {SzrResponse, login, register} from "@/services/auth";
import {useState} from "react";


export default () => {
  const [status, setStatus] = useState<string | undefined>(undefined);

  const changeLoginStatus = (response: SzrResponse) => {
    // 写入用户信息
    if (response.code === 0 && response.data !== undefined) {
      localStorage.setItem('szrToken', response.data.token);
      localStorage.setItem('szrUser', JSON.stringify(response.data.user));
      localStorage.setItem('szrExpire', response.data.expire.toString())
    }

    setStatus(response.code === 0 ? 'ok' : 'error')
  }

  const loginSzr = async (payload: Record<string, string | undefined>) => {
    const resp = await login(payload);
    changeLoginStatus(resp)
    return resp;
  }

  const registerSzr = async (payload: Record<string, any>) => {
    const resp = await register(payload);
    changeLoginStatus(resp)
    return resp;
  }

  return {status, loginSzr, registerSzr};
};
