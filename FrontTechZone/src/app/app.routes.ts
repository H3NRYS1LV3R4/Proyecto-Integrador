import { Routes } from '@angular/router';
import { ListarMarcasComponent } from './componentes/listar-marcas/listar-marcas.component';
import { ListarProveedoresComponent } from './componentes/listar-proveedores/listar-proveedores.component';
import { ActualizarMarcaComponent } from './componentes/actualizar-marca/actualizar-marca.component';
import { ActualizarProveedorComponent } from './componentes/actualizar-proveedor/actualizar-proveedor.component';
import { VerMarcaComponent } from './componentes/ver-marca/ver-marca.component';
import { VerProveedorComponent } from './componentes/ver-proveedor/ver-proveedor.component';
import { CrearMarcaComponent } from './componentes/crear-marca/crear-marca.component';
import { CrearProveedorComponent } from './componentes/crear-proveedor/crear-proveedor.component';
import { LoginComponent } from './componentes/login/login.component';
import { CrearCategoriaComponent } from './componentes/crear-categoria/crear-categoria.component';
import { adminGuard } from './guard/auth.guard';
import { ListarComprasComponent } from './componentes/listar-compras/listar-compras.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { ListarCategoriaComponent } from './componentes/listar-categoria/listar-categoria.component';
import { ListarProductosComponent } from './componentes/listar-productos/listar-productos.component';
import { VerProductoComponent } from './componentes/ver-productos/ver-productos.component';
import { ActualizarProductoComponent } from './componentes/actualizar-productos/actualizar-productos.component';
import { CrearProductoComponent } from './componentes/crear-productos/crear-productos.component';
import { ActualizarCategoriaComponent } from './componentes/actualizar-categoria/actualizar-categoria.component';
import { ListarUsuariosComponent } from './componentes/listar-usuarios/listar-usuarios.component';
import { ActualizarUsuarioComponent } from './componentes/actualizar-usuario/actualizar-usuario.component';
import { CrearUsuarioComponent } from './componentes/crear-usuario/crear-usuario.component';
import { VerUsuariosComponent } from './componentes/ver-usuarios/ver-usuarios.component';
import { VerCategoriaComponent } from './componentes/ver-categoria/ver-categoria.component';
import { CatalogoComponent } from './componentes/catalogo/catalogo.component';

export const routes: Routes = [
    { path: '', redirectTo: 'listarProductos', pathMatch: 'full' },
    // Ediciones
    { path: 'editar-producto/:codprod', component: ActualizarProductoComponent, canActivate:[adminGuard]},
    { path: 'editar/:codmarca', component: ActualizarMarcaComponent ,canActivate:[adminGuard]},
    { path: 'editarp/:codprov', component: ActualizarProveedorComponent,canActivate:[adminGuard] },
    { path: 'editarcategoria/:codcat', component: ActualizarCategoriaComponent, canActivate:[adminGuard]},
    { path: 'editar-usuario/:codUsu', component: ActualizarUsuarioComponent, canActivate:[adminGuard]},
    //registros
    { path: 'registrarProveedor', component: CrearProveedorComponent,canActivate:[adminGuard]},
    { path: 'crearCategoria', component: CrearCategoriaComponent, canActivate:[adminGuard]},
    { path: 'registrarMarca', component: CrearMarcaComponent,canActivate:[adminGuard]},
    { path: 'registrarProducto', component: CrearProductoComponent, canActivate: [adminGuard]},
    { path: 'crearUsuario', component: CrearUsuarioComponent},

    // listados 
    { path: 'listadoMarcas', component: ListarMarcasComponent, canActivate: [adminGuard]},
    { path: 'listadoProveedores', component: ListarProveedoresComponent, canActivate: [adminGuard]},
    { path: 'listarCategorias' , component: ListarCategoriaComponent, canActivate: [adminGuard]},
    { path: 'listarUsuarios', component: ListarUsuariosComponent, canActivate: [adminGuard]},
    { path: 'reporteCompras', component: ListarComprasComponent, canActivate: [adminGuard]}, 
    { path: 'listarProductos', component: ListarProductosComponent},
    { path: 'listarUsuarios', component: ListarUsuariosComponent, canActivate: [adminGuard]},
    
    // detalles 
    { path: 'detalle/:codmarca', component: VerMarcaComponent, canActivate: [adminGuard]},
    { path: 'detallec/:codcat', component: VerCategoriaComponent, canActivate: [adminGuard]},
    { path: 'detallep/:codprov', component: VerProveedorComponent, canActivate: [adminGuard]},
    { path: 'detalle-producto/:codprod', component: VerProductoComponent},
    { path: 'login' , component: LoginComponent},
    { path: 'detalleUsuario/:codUsu', component: VerUsuariosComponent, canActivate: [adminGuard]},

    { path: 'catalogo', component: CatalogoComponent },

    { path: 'carrito', component: CarritoComponent },
];
