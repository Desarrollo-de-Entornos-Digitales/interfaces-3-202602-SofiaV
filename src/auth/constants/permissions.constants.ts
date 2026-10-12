/**
 * Permisos del sistema. Los nombres deben coincidir con los de la tabla `permissions` (db/inserts.sql).
 */
export const PERMISSIONS = {
    CREATE_ROUTINE: 'create_routine',
    READ_ROUTINE: 'read_routine',
    UPDATE_ROUTINE: 'update_routine',
    DELETE_ROUTINE: 'delete_routine',
    MANAGE_USERS: 'manage_users',
    MANAGE_ROLES: 'manage_roles',
    MANAGE_EXERCISES: 'manage_exercises',
} as const;

export type PermissionName = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
