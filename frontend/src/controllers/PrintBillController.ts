import axios from "axios";
import {BASE_URL} from "../config/api";
import type {Bill} from "../models/Bill";
import {successNotification, errorNotification} from "../util/alert";

export const printBill = async (bill: Bill) => {
    try {
        const response = await axios.post(`${BASE_URL}/printer/print`, bill);
        successNotification(response.data);
    } catch (error: any) {
        errorNotification(error.message);
    }
};