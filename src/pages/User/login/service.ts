import request from '@/utils/request';

export type LoginParamsType = {
  email: string;
  password: string;
  remember: string;
};

export async function loginAccount(params: LoginParamsType) {
  return request('/server/api/login', {
    method: 'POST',
    data: params,
  });
}