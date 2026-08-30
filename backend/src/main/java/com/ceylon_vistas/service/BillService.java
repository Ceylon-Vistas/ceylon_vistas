package com.ceylon_vistas.service;

import com.ceylon_vistas.dto.BillDTO;
import com.ceylon_vistas.dto.BillItemDTO;
import com.ceylon_vistas.entity.Bill;
import com.ceylon_vistas.entity.BillItem;
import com.ceylon_vistas.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
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
        bill.setTime(LocalTime.now().format(DateTimeFormatter.ofPattern("hh:mm:ssa")));
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

    public String generateBillNo(String date) {
        LocalDate billDate = LocalDate.parse(date);
        String datePart = billDate.format(DateTimeFormatter.ofPattern("MMddyy"));

        List<Bill> bills = billRepository.findByDate(date);
        int highestOrderNumber = 0;
        for (Bill bill : bills) {
            String billNo = bill.getBillNo();
            if (billNo == null || !billNo.startsWith("B-")) {
                continue;
            }

            try {
                String numberAndDate = billNo.substring(2);
                String numberPart = numberAndDate.substring(0, numberAndDate.length() - 6);
                int orderNumber = Integer.parseInt(numberPart);
                if (orderNumber > highestOrderNumber) {
                    highestOrderNumber = orderNumber;
                }
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }

        int nextOrderNumber = highestOrderNumber + 1;
        return String.format("B-%02d%s", nextOrderNumber, datePart);
    }
}