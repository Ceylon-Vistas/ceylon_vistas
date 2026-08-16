import axios from "axios";
import {useState, useEffect} from "react";
import {BASE_URL} from "../config/api";
import type {Room} from "../models/Room";
import {errorNotification} from "../util/alert.ts";

export default function PMSController() {
    const [selectedDate, setSelectedDate] = useState("20/07/2026");
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        loadRooms();
    }, []);

    const dates = [
        {day: "MON", date: "01 Aug"},
        {day: "TUE", date: "02 Aug"},
        {day: "WED", date: "03 Aug"},
        {day: "THU", date: "04 Aug"},
        {day: "FRI", date: "05 Aug"},
        {day: "SAT", date: "06 Aug"},
        {day: "SUN", date: "07 Aug"},
    ];

    const status = [
        {name: "All", value: 5},
        {name: "Vacant", value: 3},
        {name: "Occupied", value: 1},
        {name: "Reserved", value: 0},
        {name: "Blocked", value: 1},
        {name: "Due Out", value: 0},
        {name: "Dirty", value: 2}
    ];

    const loadRooms = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/pms/rooms`);
            setRooms(response.data);
        } catch (error: any) {
            errorNotification(error.message);
        }
    };

    const saveReservation = async (reservation: any) => {
        try {
            const response = await axios.post(`${BASE_URL}/pms/reservation`, reservation);
            await loadRooms();
            return response.data;
        } catch (error: any) {
            errorNotification(error.message);
        }
    };

    const updateReservation = async (id: number, reservation: any) => {
        try {
            const response = await axios.put(`${BASE_URL}/pms/reservation/${id}`, reservation);
            await loadRooms();
            return response.data;
        } catch (error: any) {
            errorNotification(error.message);
        }
    };

    const deleteReservation = async (id: number) => {
        try {
            const response = await axios.delete(`${BASE_URL}/pms/reservation/${id}`);
            await loadRooms();
            return response.data;
        } catch (error: any) {
            errorNotification(error.message);
        }
    };

    return {
        selectedDate,
        setSelectedDate,

        rooms,
        dates,
        status,

        loadRooms,
        saveReservation,
        updateReservation,
        deleteReservation
    };
}