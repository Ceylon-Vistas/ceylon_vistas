package com.ceylon_vistas.config;

import lombok.Data;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
public class PrinterConfig {
    private final String printerIp = "192.168.1.69";
    private final int printerPort = 9100;
}