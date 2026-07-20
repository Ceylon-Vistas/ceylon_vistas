import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config/api";
import type {Room} from "../models/Room";

export default function usePMSController() {

    const [selectedDate,setSelectedDate] = useState("20/07/2026");

    const [rooms,setRooms] = useState<Room[]>([]);

    const dates = [
        {day:"MON",date:"20 Jul"},
        {day:"TUE",date:"21 Jul"},
        {day:"WED",date:"22 Jul"},
        {day:"THU",date:"23 Jul"},
        {day:"FRI",date:"24 Jul"},
        {day:"SAT",date:"25 Jul"},
        {day:"SUN",date:"26 Jul"},
        {day:"MON",date:"27 Jul"},
        {day:"TUE",date:"28 Jul"},
        {day:"WED",date:"29 Jul"},
        {day:"THU",date:"30 Jul"},
        {day:"FRI",date:"31 Jul"}
    ];


    const status = [
        {name:"All",value:5},
        {name:"Vacant",value:4},
        {name:"Occupied",value:0},
        {name:"Reserved",value:0},
        {name:"Blocked",value:1},
        {name:"Due Out",value:0},
        {name:"Dirty",value:1}
    ];


    const loadRooms = async () => {
        try {

            const response = await axios.get(
                `${BASE_URL}/pms/rooms`
            );

            setRooms(response.data);

        } catch(error:any) {

            console.log(error.message);

        }
    };


    const saveReservation = async (reservation:any) => {
        try {

            const response = await axios.post(
                `${BASE_URL}/pms/reservation`,
                reservation
            );

            await loadRooms();

            return response.data;

        } catch(error:any) {

            console.log(error.message);

        }
    };


    const updateReservation = async (
        id:number,
        reservation:any
    ) => {
        try {

            const response = await axios.put(
                `${BASE_URL}/pms/reservation/${id}`,
                reservation
            );

            await loadRooms();

            return response.data;

        } catch(error:any) {

            console.log(error.message);

        }
    };


    const deleteReservation = async(id:number) => {
        try {

            const response = await axios.delete(
                `${BASE_URL}/pms/reservation/${id}`
            );

            await loadRooms();

            return response.data;

        } catch(error:any) {

            console.log(error.message);

        }
    };


    useEffect(()=>{
        loadRooms();
    },[]);


    return {
        selectedDate,
        setSelectedDate,

        dates,
        status,

        rooms,

        loadRooms,
        saveReservation,
        updateReservation,
        deleteReservation
    };
}