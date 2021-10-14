import request from '@/utils/request';

export type RegisterParamsType = {
  instituteName: string;
  firstName: string;
  lastName: string;
  email: string,
  phonePrefix: string;
  phone: string;
  password: string;
  instituteId: string | null, 
  url: string,
};

export async function registerAccount(params: RegisterParamsType) {
  return request('/server/api/register', {
    method: 'POST',
    data: params,
  });
}