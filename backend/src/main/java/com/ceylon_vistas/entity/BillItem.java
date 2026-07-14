package com.ceylon_vistas.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class BillItem {
    @Id
    @GeneratedValue
    private Long id;
    private String itemName;
    private int qty;
    private double amount;
}