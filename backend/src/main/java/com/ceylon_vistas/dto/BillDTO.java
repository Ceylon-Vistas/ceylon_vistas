package com.ceylon_vistas.dto;

import lombok.Data;

import java.util.List;

@Data
public class BillDTO {
    private String billNo;
    private String cashier;
    private String date;
    private String time;
    private List<BillItemDTO> items;
    private double subTotal;
    private double serviceCharge;
    private double discount;
    private double total;
}