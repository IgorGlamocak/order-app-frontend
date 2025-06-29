export class UpdateUserDto {
  fullName?: string;
  email?: string;
  password?: string;
  role?: 'user' | 'admin';
}