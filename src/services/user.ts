import {request} from '@umijs/max';
import auth from "@/utils/auth";

export async function queryCurrent(params: any) {
  return await request(`/auth/query`, {
    method: 'GET',
    params,
  })
}

export async function queryNotices(params: any) {
  const res = await request(`/notification/list`, {
    method: 'GET',
    params,
    headers: auth.headers(),
  });
  if (auth.response(res)) {
    return res.data;
  }
  return [];
}

export async function updateNotices(params: any) {
  return await request(`/notification/read`, {
    method: 'POST',
    data: params,
    headers: auth.headers(),
  });
}

export async function deleteNotice(params: any) {
  return await request(`/notification/delete`, {
    method: 'POST',
    data: params,
    headers: auth.headers(),
  });
}


export async function listUsers() {
  const res = await request(`/auth/listUser`, {
    method: 'GET',
    headers: auth.headers(),
  });
  if (auth.response(res)) {
    return res.data;
  }
  return [];
}

export async function updateUsers(data: any) {
  return await request(`/auth/update`, {
    method: 'POST',
    data,
    headers: auth.headers(),
  });
}

export async function updateAvatar(data: { file: string | Blob; }) {
  const formData = new FormData();
  formData.append("file", data.file)
  return await request(`/oss/avatar`, {
    method: 'POST',
    data: formData,
    requestType: 'form',
    headers: auth.headers(false),
  });
}

export async function deleteUsers(params: any) {
  return await request(`/auth/delete`, {
    method: 'GET',
    params,
    headers: auth.headers(),
  });
}

export async function listUserActivities(params: any) {
  return await request(`/operation/count`, {
    method: 'GET',
    params,
    headers: auth.headers(),
  });
}

// 根据用户id查询用户操作记录
export async function listUserOperationLog(params: any) {
  return await request(`/operation/list`, {
    method: 'GET',
    params,
    headers: auth.headers(),
  });
}

export async function loginGithub(params: any) {
  return await request(`/auth/github/login`, {
    method: 'GET',
    params,
    headers: auth.headers(),
  });
}

export async function queryUserStatistics(params: any) {
  return await request(`/workspace/`, {
    method: 'GET',
    params,
    headers: auth.headers(),
  });
}

export async function queryFollowTestPlanData(params: any) {
  return await request(`/workspace/testplan`, {
    method: 'GET',
    params,
    headers: auth.headers(),
  });
}
