package com.ceylon_vistas.controller;

import com.ceylon_vistas.dto.BillDTO;
import com.ceylon_vistas.service.BillService;
import com.ceylon_vistas.service.PrinterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/printer")
public class PrinterController {

    @Autowired
    private PrinterService printerService;

    @Autowired
    private BillService billService;

    @PostMapping("/print")
    public String printBill(@RequestBody BillDTO dto) {
        billService.save(dto);
        printerService.printBill(dto);
        return "Bill Printed Successfully";
    }
}