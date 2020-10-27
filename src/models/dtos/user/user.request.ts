import { IsEmail, IsIn, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UserRequest {
  id: number

  @IsNotEmpty({ message: 'name' })
  name: string

  password: string

  @IsEmail({}, {message: 'invalid Email'})
  email: string

  tel: number

  isActive: number

  role: number

  companyRole: number

  groupRole: number

  subgroupRole: number

  companyId: number

  groupId: number

  subgroupId: number

  createdAt: Date

  updatedAt: Date
}
