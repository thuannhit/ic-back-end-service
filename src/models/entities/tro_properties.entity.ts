import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,

} from 'typeorm';

@Entity({ name: 'tro_properties' })
export class Property {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    property_id: number;

    @Column('varchar', {length: 256})
    property_name: string;

    @Column('bigint')
    company_id: number;

    @Column('bigint')
    group_id: number;

    @Column('bigint')
    sgroup_id: number;

    @Column('text')
    company_file_part_1: string;

    @Column('text')
    company_file_part_2: string;

    @Column('text')
    company_file_part_3: string;

    @Column('text')
    company_file_part_4: string;

    @CreateDateColumn({ nullable: false, default: 'NOW()' })
    created_at: Date;

    @Column()
    created_by: number;

    @UpdateDateColumn({ nullable: false, default: 'NOW()' })
    updated_at: Date;

    @Column()
    updated_by: number;

    @Column('tinyint')
    is_deleted: number;
}
