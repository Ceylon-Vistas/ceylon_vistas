import axios from "axios";

const BASE_URL = "http://localhost:8080/api/printer";

export interface BillItem {
    name: string;
    qty: number;
    unitPrice: number;
    total: number;
}

export interface Bill {
    receiptNo: string;
    date: string;
    cashier: string;
    items: BillItem[];
    subTotal: number;
    serviceCharge: number;
    discount: number;
    total: number;
}

export const printBill = async (bill: Bill) => {
    return await axios.post(`${BASE_URL}/print`, bill);
};