package com.techzone.techzone.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="tb_detalle_compra")
public class DetalleCompra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cod_detalle")
    private int codDetalle;

    @Column(name="cod_compra")
    private int codCompra;

    @Column(name="cod_prod")
    private int codProd;

    private int cantidad;

    @Column(name="precio_unitario")
    private double precioUnitario;

    @ManyToOne
    @JoinColumn(name = "cod_compra", insertable=false, updatable=false)
    private Compra compra;

    @ManyToOne
    @JoinColumn(name = "cod_prod", insertable=false, updatable=false)
    private Producto producto;

	public int getCodDetalle() {
		return codDetalle;
	}

	public void setCodDetalle(int codDetalle) {
		this.codDetalle = codDetalle;
	}

	public int getCodCompra() {
		return codCompra;
	}

	public void setCodCompra(int codCompra) {
		this.codCompra = codCompra;
	}

	public int getCodProd() {
		return codProd;
	}

	public void setCodProd(int codProd) {
		this.codProd = codProd;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	public double getPrecioUnitario() {
		return precioUnitario;
	}

	public void setPrecioUnitario(double precioUnitario) {
		this.precioUnitario = precioUnitario;
	}

	public Compra getCompra() {
		return compra;
	}

	public void setCompra(Compra compra) {
		this.compra = compra;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}
    
    
}