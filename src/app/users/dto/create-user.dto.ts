export class CreateUserDto {
  fullName!: string;
  email!: string;
  password!: string;
  role!: 'user' | 'admin';
}
