import { IsEmail, IsIn, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class PropertyCreationRequestDTO {

    @IsNotEmpty({ message: 'Missing property name' })
    property_name: string

    @IsNotEmpty({ message: 'Missing company information。' })
    company_id: number

    @IsNotEmpty({ message: 'Missing group information。' })
    group_id: number

    @IsNotEmpty({ message: 'Missing subgroup。' })
    subgroup_id: number

    company_file_part_1: string
    company_file_part_2: string
    company_file_part_3: string
    company_file_part_4: string
}
