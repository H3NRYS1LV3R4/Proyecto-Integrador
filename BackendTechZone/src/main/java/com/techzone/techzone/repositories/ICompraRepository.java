package com.techzone.techzone.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.techzone.techzone.models.Compra;

@Repository
public interface ICompraRepository extends JpaRepository<Compra, Integer>{

}