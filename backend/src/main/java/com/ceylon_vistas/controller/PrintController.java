package com.ceylon_vistas.controller;

import com.ceylon_vistas.dto.BillDTO;
import com.ceylon_vistas.service.BillService;
import com.ceylon_vistas.service.PrintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/print")
public class PrintController {

    @Autowired
    private BillService billService;

    @Autowired
    private PrintService printService;

    @PostMapping
    public String print(@RequestBody BillDTO dto) {
        billService.save(dto);
        printService.print(dto);
        return "Bill Printed Successfully";
    }
}