import { NotFoundException } from '@nestjs/common';

/**
 * Excepción genérica lanzada cuando un recurso (rutina, ejercicio, etc.) no existe.
 */
export class ResourceNotFoundException extends NotFoundException {
    constructor(resource: string, id: number) {
        super({
            error: `${resource} Not Found`,
            message: `${resource} con identificador ${id} no fue encontrado.`,
        });
    }
}
