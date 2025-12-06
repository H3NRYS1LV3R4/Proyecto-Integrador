package com.techzone.techzone.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tb_marca")
public class Marca {

	@Id
	@Column(name="cod_marca")
	private int codmarca;
	private String nom_marca;
	private String pai_marca;
	
	public int getCodmarca() {
		return codmarca;
	}
	public void setCodmarca(int codmarca) {
		this.codmarca = codmarca;
	}
	public String getNom_marca() {
		return nom_marca;
	}
	public void setNom_marca(String nom_marca) {
		this.nom_marca = nom_marca;
	}
	public String getPai_marca() {
		return pai_marca;
	}
	public void setPai_marca(String pai_marca) {
		this.pai_marca = pai_marca;
	}
	
	
}
