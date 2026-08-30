package com.ceylon_vistas.controller;

import com.ceylon_vistas.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@CrossOrigin
@RestController
@RequestMapping("/api/bill")
public class BillController {

    @Autowired
    private BillService billService;

    @GetMapping("/next-no")
    public String getNextBillNo() {
        String today = LocalDate.now().toString();
        return billService.generateBillNo(today);
    }
}