package com.ceylon_vistas.service;

import com.ceylon_vistas.config.PrinterConfig;
import com.ceylon_vistas.dto.BillDTO;
import com.ceylon_vistas.dto.BillItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.OutputStream;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

@Service
public class PrinterService {

    @Autowired
    private PrinterConfig printerConfig;

    public void printBill(BillDTO dto) {
        try (Socket socket = new Socket(printerConfig.getPrinterIp(), printerConfig.getPrinterPort());
             OutputStream out = socket.getOutputStream()) {

            // Initialize printer
            out.write(new byte[]{0x1B, 0x40});

            // Center alignment
            out.write(new byte[]{0x1B, 0x61, 0x01});

            // Double size + Bold
            out.write(new byte[]{0x1D, 0x21, 0x11});
            out.write("NOA SANDS\n\n".getBytes(StandardCharsets.UTF_8));

            // Normal text
            out.write(new byte[]{0x1D, 0x21, 0x00});
            out.write(new byte[]{0x1B, 0x45, 0x00});

            // Left alignment
            out.write(new byte[]{0x1B, 0x61, 0x00});

            StringBuilder sb = new StringBuilder();
            sb.append(leftRight("Receipt", dto.getReceiptNo())).append("\n");
            sb.append(leftRight("Date", dto.getDate())).append("\n");
            sb.append(leftRight("Cashier", dto.getCashier())).append("\n");

            sb.append("-----------------------------------------------\n");

            sb.append(String.format("%-24s %11s %10s\n", "Item", "Qty", "Amount"));

            sb.append("-----------------------------------------------\n");

            for (BillItemDTO item : dto.getItems()) {
                String name = item.getName();
                int maxWidth = 24;

                if (name.length() <= maxWidth) {
                    sb.append(String.format("%-24s %11d %10.2f\n", name, item.getQty(), item.getTotal()));
                } else {
                    String[] words = name.split(" ");
                    StringBuilder firstLineName = new StringBuilder();
                    StringBuilder secondLineName = new StringBuilder();

                    boolean reachedLimit = false;

                    for (String word : words) {
                        if (!reachedLimit && (firstLineName.length() + word.length() + (firstLineName.length() > 0 ? 1 : 0) <= maxWidth)) {
                            if (firstLineName.length() > 0) {
                                firstLineName.append(" ");
                            }
                            firstLineName.append(word);
                        } else {
                            reachedLimit = true;
                            if (secondLineName.length() > 0) {
                                secondLineName.append(" ");
                            }
                            secondLineName.append(word);
                        }
                    }

                    sb.append(String.format("%-24s %11d %10.2f\n", firstLineName.toString(), item.getQty(), item.getTotal()));
                    String remainingText = secondLineName.toString();
                    if (remainingText.length() > maxWidth) {
                        remainingText = remainingText.substring(0, maxWidth);
                    }
                    sb.append(remainingText).append("\n");
                }
            }

            sb.append("-----------------------------------------------\n");

            sb.append(leftRight("Bill Amount", format(dto.getSubTotal()))).append("\n");
            sb.append(leftRight("Service Charge", format(dto.getServiceCharge()))).append("\n");
            sb.append(leftRight("Discount", format(dto.getDiscount()))).append("\n");
            sb.append(leftRight("Total", format(dto.getTotal()))).append("\n");

            sb.append("-----------------------------------------------\n");

            sb.append(center("Thank You!")).append("\n\n\n\n");

            out.write(sb.toString().getBytes(StandardCharsets.UTF_8));

            // Feed paper
            out.write(new byte[]{0x0A, 0x0A, 0x0A});

            // Full cut
            out.write(new byte[]{0x1D, 0x56, 0x00});

            out.flush();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String format(double value) {
        return String.format("%.2f", value);
    }

    private String center(String text) {
        int width = 42;
        if (text.length() >= width)
            return text;
        int left = (width - text.length()) / 2;
        return " ".repeat(left) + text;
    }

    private String leftRight(String left, String right) {
        int width = 47;
        int spaces = width - left.length() - right.length();
        if (spaces < 1)
            spaces = 1;
        return left + " ".repeat(spaces) + right;
    }
}