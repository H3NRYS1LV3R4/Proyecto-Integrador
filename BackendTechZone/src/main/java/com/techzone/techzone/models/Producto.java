package com.techzone.techzone.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="tb_producto")
@Data
public class Producto {

	@Id
	@Column(name="cod_prod")
	private int codprod;
	private String nom_prod;
	private String des_prod;
	private int cod_cat;
	private int stock_prod;
	private double precio_compra;
	private int cod_prov;
	private int cod_marca;
	
	@ManyToOne
	@JoinColumn(name = "cod_cat",insertable=false,updatable=false)
	private Categoria objCategoria;
	
	@ManyToOne
	@JoinColumn(name = "cod_prov",insertable=false,updatable=false)
	private Proveedor objProveedor;
	
	@ManyToOne
	@JoinColumn(name = "cod_marca",insertable=false,updatable=false)
	private Marca objMarca;
	
}
