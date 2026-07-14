package com.ceylon_vistas.dto;

import lombok.Data;

@Data
public class BillItemDTO {
    private String name;
    private int qty;
    private double unitPrice;
    private double total;
}