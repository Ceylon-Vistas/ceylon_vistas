package com.ceylon_vistas.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Bills")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String receiptNo;
    private String cashier;
    private String date;
    private String time;
    private double subTotal;
    private double serviceCharge;
    private double discount;
    private double total;

    @OneToMany(mappedBy = "bill", cascade = CascadeType.ALL)
    private List<BillItem> items;
}