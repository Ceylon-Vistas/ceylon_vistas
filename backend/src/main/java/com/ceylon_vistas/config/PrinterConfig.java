package com.ceylon_vistas.config;

import lombok.Getter;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class PrinterConfig {
    private final String printerIp = "192.168.1.6";
    private final int printerPort = 9100;
}