import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Task' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  userId: number;
}
