package com.techzone.techzone.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="tb_proveedor")
@Data
public class Proveedor {

	@Id
	@Column(name="cod_prov")
	private int codprov;
	private String nom_prov;
}
