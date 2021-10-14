import request from '@/utils/request';

export type StepFormParamsType = {
  // instituteName: string;
  // firstName: string;
  // lastName: string;
  // email: string,
  // phonePrefix: string;
  // phone: string;
  // password: string;
  // userType: string;
};

export async function saveUser(step: string, params: StepFormParamsType) {
  return request(`/server/api/users/setup/${step}`, {
    method: 'POST',
    data: params,
  });
}

export async function getUserById(_id: string) {
  return request(`/server/api/user/${_id}`);
}

export async function getUserList(params: any) {
  return request(`/server/api/users/list`, {
    method: 'GET',
    params: {params: JSON.stringify(params)},
  });
}