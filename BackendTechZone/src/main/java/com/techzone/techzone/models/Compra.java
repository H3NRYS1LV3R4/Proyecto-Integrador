package com.techzone.techzone.models;

import java.time.LocalDate;
import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Transient;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="tb_compra")
public class Compra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cod_compra")
    private int codCompra;

    @Column(name="fec_compra")
    private LocalDate fecCompra;

    @Column(name="monto_compra")
    private double montoCompra;

    private String mpago;

    @Column(name="cod_usu")
    private int codUsu;

    @ManyToOne
    @JoinColumn(name = "cod_usu", insertable=false, updatable=false)
    private Usuario usuario;

	public int getCodCompra() {
		return codCompra;
	}

	public void setCodCompra(int codCompra) {
		this.codCompra = codCompra;
	}

	public LocalDate getFecCompra() {
		return fecCompra;
	}

	public void setFecCompra(LocalDate fecCompra) {
		this.fecCompra = fecCompra;
	}

	public double getMontoCompra() {
		return montoCompra;
	}

	public void setMontoCompra(double montoCompra) {
		this.montoCompra = montoCompra;
	}

	public String getMpago() {
		return mpago;
	}

	public void setMpago(String mpago) {
		this.mpago = mpago;
	}

	public int getCodUsu() {
		return codUsu;
	}

	public void setCodUsu(int codUsu) {
		this.codUsu = codUsu;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	
	public void setDetalles(List<DetalleCompra> detalles) {
		this.detalles = detalles;
	}

	public void prePersist() {
        this.fecCompra = LocalDate.now();
    }
	
	@OneToMany(mappedBy = "compra")
    private List<DetalleCompra> detalles; 

    public List<DetalleCompra> getDetalles() {
		return detalles;
	}
    
    

	
}