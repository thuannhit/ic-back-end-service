import { IsEmail, IsIn, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
export interface NewUser {
    _id?: number
    name: string,
    password: string,
    email: string,
    tel: string,
    isActive: number,
    role: number,
    companyRole: number,
    groupRole: number,
    subgroupRole: number,
    companyId: number,
    groupId: number,
    subgroupId: number,
    createdAt?: number,
    updatedAt?: number,
}