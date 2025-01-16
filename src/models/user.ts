import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Task } from './task';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number; // Internal application ID

    @Column({ type: 'varchar', length: 255, unique: true })
    username!: string; // Matches the LDAP username (e.g., `uid` in LDAP)

    @Column({ type: 'varchar', length: 255, nullable: true })
    email?: string; // Optional: email pulled from LDAP

    @Column({ type: 'varchar', length: 255, nullable: true })
    displayName?: string; // Optional: full name from LDAP

    @Column({ type: 'varchar', length: 50, nullable: true })
    role?: string; // Application-specific role (e.g., Admin, User)

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Task, (task) => task.user)
    tasks!: Task[];
}
