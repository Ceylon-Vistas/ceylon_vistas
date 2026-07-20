package com.ceylon_vistas.service;

import com.ceylon_vistas.dto.BillDTO;
import com.ceylon_vistas.entity.Bill;
import com.ceylon_vistas.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    public Bill save(BillDTO dto) {
        Bill bill = new Bill();
        bill.setReceiptNo(dto.getReceiptNo());
        bill.setDate(dto.getDate());
        bill.setTime(dto.getTime());
        bill.setCashier(dto.getCashier());
        bill.setSubTotal(dto.getSubTotal());
        bill.setServiceCharge(dto.getServiceCharge());
        bill.setDiscount(dto.getDiscount());
        bill.setTotal(dto.getTotal());
        return billRepository.save(bill);
    }

    public List<Bill> getAll() {
        return billRepository.findAll();
    }

    public Bill getById(Long id) {
        return billRepository.findById(id).orElseThrow(() -> new RuntimeException("Bill not found"));
    }
}