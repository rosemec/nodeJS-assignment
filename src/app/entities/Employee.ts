import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import { AbstractEntity } from './AbstractEntity';
import { Address } from './Address';
import { Department } from './Department';


@Entity("employee")
    export class Employee extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
    
        @Column({ nullable: false })
        public name: string;

        @Column({nullable: true})
        public departmentId: string;

        @Column()
        public joiningDate: string

        @Column({nullable: true})
        public addressZipCode: string

        @Column()
        public email: string

        @Column({nullable: true})
        public role: string

        @Column({nullable: true})
        public status: string

        @Column({default: 0})
        public experience: number

        @Column({nullable: true})
        public password: string

    @ManyToOne(()=> Department, {cascade: true})
    @JoinColumn()
    public department: Department;

    @OneToOne(() => Address, {cascade: true})
    @JoinColumn()
    public address: Address;
}
