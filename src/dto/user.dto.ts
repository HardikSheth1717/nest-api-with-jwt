import { Entity, Column, PrimaryGeneratedColumn, Repository, EntityRepository } from 'typeorm';
import { IsInt, IsNotEmpty, IsPositive, Length, MinLength, MaxLength, IsDefined } from 'class-validator';

@Entity({ name: 'users' })
export default class User {
    @IsInt()
    @IsDefined()
    @PrimaryGeneratedColumn('increment', { type: 'int' })
    Id: number;

    @MinLength(3)
    @MaxLength(100)
    @IsDefined()
    @Column('varchar', { length: 100, nullable: false })
    FirstName: string;
 
    @MinLength(3)
    @MaxLength(100)
    @IsDefined()
    @Column('varchar', { length: 100, nullable: false })
    LastName: string;
 
    @IsInt()
    @IsPositive()
    @IsDefined()
    @Column('int', { nullable: false })
    Age: number;
 
    @MinLength(4)
    @MaxLength(6)
    @IsDefined()
    @Column('varchar', { length: 100, nullable: false })
    Gender: string;
 
    @MinLength(5)
    @MaxLength(45)
    @IsDefined()
    @Column('varchar', { length: 100, nullable: false })
    UserName: string;
 
    @IsInt()
    @IsPositive()
    @IsDefined()
    @Column({ nullable: false })
    RoleId: number;
 
    @MinLength(8)
    @MaxLength(20)
    @IsDefined()
    @Column('varchar', { length: 100, nullable: false })
    Password: string;
}