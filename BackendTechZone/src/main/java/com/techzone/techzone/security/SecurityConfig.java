package com.techzone.techzone.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.techzone.techzone.services.CustomDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private CustomDetailsService customUserDetailsService;


	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
		.cors(cors -> cors.configurationSource(corsConfigurationSource()))
		.csrf(csrf -> csrf.disable())
		.authorizeHttpRequests(auth -> auth
				 .requestMatchers(HttpMethod.GET, "/api/productos/**").permitAll()
				 .requestMatchers(HttpMethod.GET, "/api/categorias/**").permitAll()
				 .requestMatchers(HttpMethod.GET, "/api/marcas/**").permitAll()
				 .requestMatchers(HttpMethod.GET, "/api/proveedores/**").permitAll()
				 .requestMatchers(HttpMethod.GET, "/api/usuarios/**").hasRole("ADMIN")
				 .requestMatchers(HttpMethod.GET, "/api/compras/reporte").hasRole("ADMIN")
				 .requestMatchers(HttpMethod.POST, "/api/productos").hasRole("ADMIN")  		 //✅
				 .requestMatchers(HttpMethod.POST, "/api/categorias").hasRole("ADMIN") 		 //✅
				 .requestMatchers(HttpMethod.POST, "/api/marcas").hasRole("ADMIN")     		 //✅
				 .requestMatchers(HttpMethod.POST, "/api/proveedores").hasRole("ADMIN")		 //✅
				 .requestMatchers(HttpMethod.POST, "/api/usuarios/registrar").permitAll()            //✅
				 .requestMatchers(HttpMethod.POST, "/api/compras/registrar").permitAll()            //✅
				 .requestMatchers(HttpMethod.PUT, "/api/marcas/**").hasRole("ADMIN")   		 //✅
				 .requestMatchers(HttpMethod.PUT, "/api/proveedores/**").hasRole("ADMIN")       //✅
				 .requestMatchers(HttpMethod.DELETE, "/api/marcas/**").hasRole("ADMIN")		 //✅
				 .requestMatchers(HttpMethod.DELETE, "/api/proveedores/**").hasRole("ADMIN")    //✅
				 .requestMatchers(HttpMethod.DELETE, "api/productos").hasRole("ADMIN")
				 .requestMatchers(HttpMethod.DELETE, "/api/usuarios").hasRole("ADMIN")         //✅	
				 .anyRequest().authenticated()
				)
			.httpBasic(basic -> {});
		return http.build();
	}
	@Autowired
    private PasswordEncoder passwordEncoder;

	// Usuario en memoria de ejemplo
	@Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder)
                .and()
                .build();

    }
	
	@Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); 
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
/*
.authorizeHttpRequests(auth -> auth
						.requestMatchers("/api/productos/**").hasRole("ADMIN") 
						// Solo ADMIN puede acceder
						.anyRequest().authenticated())


*/