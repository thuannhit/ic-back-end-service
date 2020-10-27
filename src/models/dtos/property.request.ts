import { IsEmail, IsIn, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class PropertyRequest {

  @IsNotEmpty({ message: 'name' })
  name: string

  companyId: number

  groupId: number

  subgroupId: number

  filePath1: string

  filePath2: string

  filePath3: string

  filePath4: string

  createdAt: Date

  updatedAt: Date
}