package com.techzone.techzone.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.techzone.techzone.models.DetalleCompra;

@Repository
public interface IDetalleCompraRepository extends JpaRepository<DetalleCompra, Integer>{

}