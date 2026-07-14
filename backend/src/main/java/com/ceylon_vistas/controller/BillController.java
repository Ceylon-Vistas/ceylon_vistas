package com.ceylon_vistas.controller;

import com.ceylon_vistas.dto.BillDTO;
import com.ceylon_vistas.service.BillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/bill")
public class BillController {

    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    @PostMapping
    public ResponseEntity<?> saveBill(@RequestBody BillDTO dto) {
        return ResponseEntity.ok(billService.saveBill(dto));
    }

    @GetMapping
    public ResponseEntity<?> getBills() {
        return ResponseEntity.ok(billService.getAllBills());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBill(@PathVariable Long id) {
        return ResponseEntity.ok(billService.getBillById(id));
    }
}