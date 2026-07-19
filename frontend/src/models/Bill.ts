import type {BillItem} from "./BillItem";

export interface Bill {
    receiptNo: string;
    cashier: string;
    date: string;
    time: string;
    items: BillItem[];
    subTotal: number;
    serviceCharge: number;
    discount: number;
    total: number;
}