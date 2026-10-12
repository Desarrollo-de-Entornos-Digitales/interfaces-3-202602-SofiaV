import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Routine } from '../../routine/entities/routine.entity';
import { Exercise } from '../../exercise/entities/exercise.entity';
import { ActivityExercise } from '../../activity-exercise/entities/activity-exercise.entity';

@Entity('routine_exercises')
export class RoutineExercise {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'routine_id' })
    routineId: number;

    @ManyToOne(() => Routine, (routine) => routine.routineExercises, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'routine_id' })
    routine: Routine;

    @Column({ name: 'exercise_id' })
    exerciseId: number;

    @ManyToOne(() => Exercise, (exercise) => exercise.routineExercises, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'exercise_id' })
    exercise: Exercise;

    @Column({ name: 'order_index', type: 'int' })
    orderIndex: number;

    @Column({ name: 'target_sets', type: 'int', default: 1 })
    targetSets: number;

    @Column({ name: 'target_reps', type: 'int', default: 1 })
    targetReps: number;

    @Column({ name: 'target_weight_kg', type: 'float', default: 0 })
    targetWeightKg: number;

    @Column({ name: 'target_duration_min', type: 'int', default: 0 })
    targetDurationMin: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @OneToMany(() => ActivityExercise, (activityExercise) => activityExercise.routineExercise)
    activityExercises: ActivityExercise[];
}
