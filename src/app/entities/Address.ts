import {Column, Entity, PrimaryColumn} from 'typeorm'
import { AbstractEntity } from './AbstractEntity';

@Entity("address")
    export class Address extends AbstractEntity {
        @PrimaryColumn()
        public zipCode: string;
    
        @Column()
        public city: string;

        @Column()
        public district: string;

        @Column()
        public state: string;

}