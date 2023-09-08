import {request} from '@umijs/max';

/** 登录接口 POST /api/login/account */

export interface SzrResponse {
  code: number;
  data?: any;
  msg?: string;
}

export interface LoginResponse {
  token: string;
  expire: number;
  user: LoginUser;
}

export interface LoginUser {
  id: number;
  username: string;
  name: string;
  email: string;

  avatar?: string;
  created_at: string;
  deleted_at: number;

  is_valid: boolean;
  last_login_at: string;

  phone: string | null;
  role: number;
  update_user: number | null;
  updated_at: string;
}


export async function login(params: Record<string, string | undefined>) {
  return request<SzrResponse>('/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function register(params: Record<string, any>) {
  return request<SzrResponse>(`/auth/register`, {
    method: 'POST',
    data: params,
  });
}

export async function currentUser(params: Record<string, string>) {
  return request<{ data: LoginUser; msg?: string; code: number; }>(`/auth/query`, {
    method: 'GET',
    params,
  });
}
