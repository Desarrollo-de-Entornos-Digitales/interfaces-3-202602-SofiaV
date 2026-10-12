import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ActivityLog } from '../../activity-log/entities/activity-log.entity';
import { RoutineExercise } from '../../routine-exercise/entities/routine-exercise.entity';

@Entity('activity_exercises')
export class ActivityExercise {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'activity_log_id' })
    activityLogId: number;

    @ManyToOne(() => ActivityLog, (activityLog) => activityLog.activityExercises, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'activity_log_id' })
    activityLog: ActivityLog;

    @Column({ name: 'routine_exercise_id' })
    routineExerciseId: number;

    @ManyToOne(() => RoutineExercise, (routineExercise) => routineExercise.activityExercises, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'routine_exercise_id' })
    routineExercise: RoutineExercise;

    @Column({ name: 'actual_sets', type: 'int', default: 0 })
    actualSets: number;

    @Column({ name: 'actual_reps', type: 'int', default: 0 })
    actualReps: number;

    @Column({ name: 'actual_weight_kg', type: 'float', default: 0 })
    actualWeightKg: number;

    @Column({ name: 'actual_duration_min', type: 'int', default: 0 })
    actualDurationMin: number;

    @Column({ name: 'calories_burned', type: 'float', default: 0 })
    caloriesBurned: number;

    @Column({ name: 'distance_covered_km', type: 'float', default: 0 })
    distanceCoveredKm: number;

    @Column({ name: 'started_at', type: 'timestamp' })
    startedAt: Date;

    @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
    completedAt: Date;
}
