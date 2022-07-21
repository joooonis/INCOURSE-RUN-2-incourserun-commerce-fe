export interface FormValues {
  reasons: string;
  reasonOthers: string;
  incourserun: '인코스런';
}

export type WithdrawalType = {
  reasons: string;
  reasonOthers: string;
};

export type UserType = {
  avatar: File;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  gender: string;
  age: string;
};
