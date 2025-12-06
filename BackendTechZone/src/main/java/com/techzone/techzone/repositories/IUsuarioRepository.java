package com.techzone.techzone.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.techzone.techzone.models.Usuario;



@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario, Integer> {
    Usuario findByNomUsu(String nom_usu);
}
