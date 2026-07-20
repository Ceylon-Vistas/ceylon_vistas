package com.ceylon_vistas.controller;

import com.ceylon_vistas.dto.BillDTO;
import com.ceylon_vistas.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/bill")
public class BillController {

    @Autowired
    private BillService billService;

    @PostMapping
    public ResponseEntity<?> save(@RequestBody BillDTO dto) {
        return ResponseEntity.ok(billService.save(dto));
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(billService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return ResponseEntity.ok(billService.getById(id));
    }
}