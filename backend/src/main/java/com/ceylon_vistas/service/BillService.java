package com.ceylon_vistas.service;

import com.ceylon_vistas.dto.BillDTO;
import com.ceylon_vistas.dto.BillItemDTO;
import com.ceylon_vistas.entity.Bill;
import com.ceylon_vistas.entity.BillItem;
import com.ceylon_vistas.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    public Bill save(BillDTO dto) {

        Bill bill = new Bill();
        bill.setBillNo(dto.getBillNo());
        bill.setDate(dto.getDate());
        bill.setTime(dto.getTime());
        bill.setCashier(dto.getCashier());
        bill.setSubTotal(dto.getSubTotal());
        bill.setServiceCharge(dto.getServiceCharge());
        bill.setDiscount(dto.getDiscount());
        bill.setTotal(dto.getTotal());

        List<BillItem> billItems = new ArrayList<>();
        for (BillItemDTO dtoItem : dto.getItems()) {
            BillItem item = new BillItem();
            item.setName(dtoItem.getName());
            item.setQty(dtoItem.getQty());
            item.setUnitPrice(dtoItem.getUnitPrice());
            item.setTotal(dtoItem.getTotal());
            item.setBill(bill);
            billItems.add(item);
        }

        bill.setItems(billItems);
        return billRepository.save(bill);
    }

    public List<Bill> getAll() {
        return billRepository.findAll();
    }

    public Bill getById(Long id) {
        return billRepository.findById(id).orElseThrow(() -> new RuntimeException("Bill not found"));
    }
}