package com.techzone.techzone.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="tb_marca")
@Data
public class Marca {

	@Id
	@Column(name="cod_marca")
	private int codmarca;
	private String nom_marca;
	private String pai_marca;
}
