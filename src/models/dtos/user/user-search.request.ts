import { IsEmail, IsIn, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UserSearchRequest {
  role: number

  companyId: number

  groupId: number

  subgroupId: number
}