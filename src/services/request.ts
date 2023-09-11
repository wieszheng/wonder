import {request} from '@umijs/max';

export interface SzrResponse {
  code: number;
  data?: any;
  msg?: string;
}

export async function httpRequest(params: any) {
  return request<SzrResponse>('/request/http', {
    method: 'POST',
    data: params,
  });
}
