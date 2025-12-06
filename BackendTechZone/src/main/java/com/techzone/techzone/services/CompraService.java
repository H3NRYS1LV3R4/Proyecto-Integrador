package com.techzone.techzone.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.techzone.techzone.models.Compra;
import com.techzone.techzone.models.DetalleCompra;
import com.techzone.techzone.models.Producto;
import com.techzone.techzone.repositories.ICompraRepository;
import com.techzone.techzone.repositories.IDetalleCompraRepository;
import com.techzone.techzone.repositories.IProductoRepository;

@Service
public class CompraService {

    @Autowired
    private ICompraRepository repoCompra;

    @Autowired
    private IDetalleCompraRepository repoDetalle;
    
    @Autowired
    private IProductoRepository repoProducto;

    @Transactional 
    public Compra registrarCompra(Compra compra) {
        compra.prePersist();
        Compra compraGuardada = repoCompra.save(compra);

        if (compra.getDetalles() != null) {
            for (DetalleCompra detalle : compra.getDetalles()) {
                
                detalle.setCodCompra(compraGuardada.getCodCompra());
                
                repoDetalle.save(detalle);

                Producto producto = repoProducto.findById(detalle.getCodProd()).orElse(null);
                if (producto != null) {
                    int nuevoStock = producto.getStock_prod() - detalle.getCantidad();
                    if (nuevoStock < 0) {
                        throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNom_prod());
                    }
                    producto.setStock_prod(nuevoStock);
                    repoProducto.save(producto);
                }
            }
        }
        return compraGuardada;
    }
    
    public List<Compra> listarCompras() {
        return repoCompra.findAll();
    }
}