package com.techzone.techzone.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.techzone.techzone.models.Compra;
import com.techzone.techzone.services.CompraService;

@RestController
@RequestMapping("/api/compras")
public class CompraController {

    @Autowired
    private CompraService servicio;

    @PostMapping("/registrar")
    public ResponseEntity<Compra> registrarCompra(@RequestBody Compra compra) {
        try {
            Compra nuevaCompra = servicio.registrarCompra(compra);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaCompra);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/reporte")
    public ResponseEntity<List<Compra>> listarCompras() {
        return ResponseEntity.ok(servicio.listarCompras());
    }
}