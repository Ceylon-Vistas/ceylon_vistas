import type {Reservation} from "./Reservation";

export interface Room {
    id: string;
    reservations?: Reservation[];
    maintenance?: boolean;
}