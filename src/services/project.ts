import {request} from '@umijs/max';
import auth from '@/utils/auth';
export interface SzrResponse {
  code: number;
  data?: any;
  msg?: string;
}


export async function listProject(params: any) {
  return request(`/project/list`, {
    method: 'GET',
    params,
    headers: auth.headers(),
  });
}

export async function insertProject(params: any) {
  return request(`/project/insert`, {
    method: 'POST',
    data: params,
    headers: auth.headers(),
  });
}

export async function queryProject(params: any) {
  return request(`/project/query`, {
    method: 'GET',
    params,
    headers: auth.headers(),
  });
}

export async function updateProject(data: any) {
  return request(`/project/update`, {
    method: 'POST',
    data,
    headers: auth.headers(),
  });
}

export async function insertProjectRole(data: any) {
  return request(`/project/role/insert`, {
    method: 'POST',
    data,
    headers: auth.headers(),
  });
}

export async function updateProjectRole(data: any) {
  return request(`/project/role/update`, {
    method: 'POST',
    data,
    headers: auth.headers(),
  });
}

export async function deleteProjectRole(data: any) {
  return request(`/project/role/delete`, {
    method: 'POST',
    data,
    headers: auth.headers(),
  });
}
//
// export async function updateAvatar(data) {
//   const formData = new FormData();
//   formData.append("file", data.file)
//   return await request(`/project/avatar/${data.project_id}`, {
//     method: 'POST',
//     data: formData,
//     requestType: 'form',
//     headers: auth.headers(false),
//   });
// }
//
// /**
//  * 删除项目
//  */
// export async function deleteProject(params) {
//   return request(`/project/delete`, {
//     method: 'DELETE',
//     params,
//     headers: auth.headers(),
//   });
// }
