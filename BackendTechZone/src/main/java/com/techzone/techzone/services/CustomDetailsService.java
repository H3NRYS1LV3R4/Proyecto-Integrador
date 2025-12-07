package com.techzone.techzone.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.techzone.techzone.models.Usuario;
import com.techzone.techzone.repositories.IUsuarioRepository;
import com.techzone.techzone.security.CustomUserDetails;

@Service
public class CustomDetailsService implements UserDetailsService{

    @Autowired
    private IUsuarioRepository repoUsua;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // --- AGREGA ESTE PRINT ---
        System.out.println("1. Intentando login con el usuario: " + username); 

        // Asegúrate de que esta línea sea la nueva (findByUsuario)
        Usuario usuario = repoUsua.findByUsuario(username); 
        
        // --- AGREGA ESTE BLOQUE DE PRINTS ---
        if (usuario == null) {
            System.out.println("2. ¡ERROR! No se encontró a nadie con el usuario: " + username);
            throw new UsernameNotFoundException("Usuario no encontrado");
        } else {
            System.out.println("2. ¡ÉXITO! Se encontró al usuario en BD. ID: " + usuario.getCodusu());
            System.out.println("3. La clave en BD es: " + usuario.getClave());
            System.out.println("4. El rol en BD es: " + usuario.getRol());
        }
        
        return new CustomUserDetails(usuario);
    }
}
