import {message} from 'antd';
import {RequestOptions} from "@@/plugin-request/request";
import type {SzrResponse} from '@/services/request'
interface headers {
  token: string;
  "Content-Type"?: string;
}

export default {
  headers: (json = true): RequestOptions => {
    const token = localStorage.getItem('szrToken') || '';
    const header: headers = {token};
    if (json) {
      header['Content-Type'] = 'application/json';
    }
    return header;
  },

  response: (res: SzrResponse, info = false) => {
    if (!res || res.code === undefined) {
      message.error("网络开小差了，请稍后重试")
      return false;
    }
    if (res.code === 0) {
      if (info) {
        message.success(res.msg);
      }
      return true;
    }
    if (res.code === 401) {
      // 说明用户未认证
      // message.info(res.msg);
      localStorage.removeItem('pityToken');
      localStorage.removeItem('pityUser');
      const href = window.location.href;
      if (href.indexOf("/user/login") === -1) {
        const uri = href.split("redirect=")
        window.location.href = `/#/user/login?redirect=${uri[uri.length - 1]}`
        // window.open(`/#/user/login?redirect=${href}`)
      }
      message.info(res.msg);
      return false;
    }
    message.error(res.msg);
    return false;
  },
};
