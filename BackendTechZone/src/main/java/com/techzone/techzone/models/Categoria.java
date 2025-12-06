package com.techzone.techzone.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="tb_categoria")
@Data
public class Categoria {

	@Id
	@Column(name="cod_cat")
	private int codcat;
	private String nom_cat;
}
