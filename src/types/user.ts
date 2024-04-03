export type IUserInfo = {
  display_picture_url: string;
  email: string;
  extra_metadata: string;
  first_name: string;
  full_name?: string;
  id: string;
  last_name: string;
  password: string | null;
  signin_provider: string;
};
