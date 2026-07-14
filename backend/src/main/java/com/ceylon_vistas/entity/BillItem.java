package com.ceylon_vistas.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "BillItems")
public class BillItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int qty;
    private double unitPrice;
    private double total;

    @ManyToOne
    @JoinColumn(name = "bill_id")
    private Bill bill;
}