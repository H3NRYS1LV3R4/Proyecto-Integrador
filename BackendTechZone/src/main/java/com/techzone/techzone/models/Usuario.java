package com.techzone.techzone.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="tb_usuario")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
public class Usuario {

	@Id
	@Column(name="cod_usu")
	private int codusu;
	@Column(name = "nom_Usu")
	private String nomUsu;
	private String ape_usu;
	private String dni_usu;
	private String email;
	private String telefono;
	private String direccion;
	private String usuario;
	private String clave;
	private String rol;
}
