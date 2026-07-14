package com.ceylon_vistas.dto;

import lombok.Data;

import java.util.List;

@Data
public class BillDTO {
    private String receiptNo;
    private String date;
    private String cashier;
    private List<BillItemDTO> items;
    private double subTotal;
    private double serviceCharge;
    private double discount;
    private double total;
}