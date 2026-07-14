import type {BillItem} from "./BillItem";

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