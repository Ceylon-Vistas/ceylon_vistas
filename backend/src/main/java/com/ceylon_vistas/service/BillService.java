package com.ceylon_vistas.service;

import com.ceylon_vistas.dto.BillDTO;
import com.ceylon_vistas.entity.Bill;
import com.ceylon_vistas.repository.BillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillService {

    private final BillRepository billRepository;

    public BillService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    public Bill saveBill(BillDTO dto) {
        Bill bill = new Bill();
        bill.setTotal(dto.getTotal());
        return billRepository.save(bill);
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public Bill getBillById(Long id) {
        return billRepository.findById(id).orElseThrow(() -> new RuntimeException("Bill not found"));
    }
}