package com.ceylon_vistas.service;

import com.ceylon_vistas.config.PrinterConfig;
import com.ceylon_vistas.dto.BillDTO;
import com.ceylon_vistas.dto.BillItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.OutputStream;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

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
                int maxWidth = 30;

                List<String> lines = new ArrayList<>();
                StringBuilder currentLine = new StringBuilder();

                for (String word : name.split(" ")) {
                    while (word.length() > maxWidth) {
                        if (currentLine.length() > 0) {
                            lines.add(currentLine.toString());
                            currentLine.setLength(0);
                        }
                        lines.add(word.substring(0, maxWidth));
                        word = word.substring(maxWidth);
                    }

                    if (currentLine.length() == 0) {
                        currentLine.append(word);
                    } else if (currentLine.length() + 1 + word.length() <= maxWidth) {
                        currentLine.append(" ").append(word);
                    } else {
                        lines.add(currentLine.toString());
                        currentLine.setLength(0);
                        currentLine.append(word);
                    }
                }

                if (currentLine.length() > 0) {
                    lines.add(currentLine.toString());
                }

                // Print first line with qty and amount
                sb.append(String.format("%-30s %5d %10.2f%n",
                        lines.get(0),
                        item.getQty(),
                        item.getTotal()));

                // Print remaining lines
                for (int i = 1; i < lines.size(); i++) {
                    sb.append(String.format("%-30s%n", lines.get(i)));
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