import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('server/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/server/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('server/api/notices');
}

export async function logoutAccount() {
  return request('/server/api/logout');
}