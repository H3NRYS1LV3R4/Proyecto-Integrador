package com.techzone.techzone.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tb_categoria")
public class Categoria {

	@Id
	@Column(name="cod_cat")
	private int codcat;
	private String nom_cat;
	
	public int getCodcat() {
		return codcat;
	}
	public void setCodcat(int codcat) {
		this.codcat = codcat;
	}
	public String getNom_cat() {
		return nom_cat;
	}
	public void setNom_cat(String nom_cat) {
		this.nom_cat = nom_cat;
	}
	
	
}
