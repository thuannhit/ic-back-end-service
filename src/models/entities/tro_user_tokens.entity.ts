import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,

} from 'typeorm';

@Entity({ name: 'tro_user_tokens' })
export class UserTokens {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    token_id: number;

    @Column('bigint')
    user_id: number;

    @Column('tinyint')
    token_type: number;

    @Column('varchar')
    token_value: string;

    @CreateDateColumn({ nullable: false, default: 'NOW()' })
    created_at: Date;

    @Column()
    created_by: number;

    @UpdateDateColumn({ nullable: false, default: 'NOW()' })
    updated_at: Date;

    @Column()
    updated_by: number;

    @Column()
    is_deleted: number;
}
