export type SignInDto = {
  email: string;
  password: string;
};

export type SignUpDto = {
  email: string;
  password: string;
};

export type SignUpResponse = {
  accessToken: string;
};

export type SignInResponse = {
  accessToken: string;
};
