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
import { authGuard } from './guard/auth.guard';
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
    { path: 'editar-producto/:codprod', component: ActualizarProductoComponent, canActivate:[authGuard]},
    { path: 'editar/:codmarca', component: ActualizarMarcaComponent ,canActivate:[authGuard]},
    { path: 'editarp/:codprov', component: ActualizarProveedorComponent,canActivate:[authGuard] },
    { path: 'editarcategoria/:codcat', component: ActualizarCategoriaComponent, canActivate:[authGuard]},
    { path: 'editar-usuario/:codUsu', component: ActualizarUsuarioComponent, canActivate:[authGuard]},
    //registros
    { path: 'registrarProveedor', component: CrearProveedorComponent,canActivate:[authGuard]},
    { path: 'crearCategoria', component: CrearCategoriaComponent, canActivate:[authGuard]},
    { path: 'registrarMarca', component: CrearMarcaComponent,canActivate:[authGuard]},
    { path: 'registrarProducto', component: CrearProductoComponent, canActivate: [authGuard]},
    { path: 'crearUsuario', component: CrearUsuarioComponent},

    // listados 
    { path: 'listadoMarcas', component: ListarMarcasComponent, canActivate: [authGuard]},
    { path: 'listadoProveedores', component: ListarProveedoresComponent, canActivate: [authGuard]},
    { path: 'listarCategorias' , component: ListarCategoriaComponent, canActivate: [authGuard]},
    { path: 'listarProductos', component: ListarProductosComponent},
    { path: 'listarUsuarios', component: ListarUsuariosComponent, canActivate: [authGuard]},
    
    // detalles 
    { path: 'detalle/:codmarca', component: VerMarcaComponent, canActivate: [authGuard]},
    { path: 'detallec/:codcat', component: VerCategoriaComponent, canActivate: [authGuard]},
    { path: 'detallep/:codprov', component: VerProveedorComponent, canActivate: [authGuard]},
    { path: 'detalle-producto/:codprod', component: VerProductoComponent},
    { path: 'login' , component: LoginComponent},
    { path: 'detalleUsuario/:codUsu', component: VerUsuariosComponent, canActivate: [authGuard]},

    { path: 'catalogo', component: CatalogoComponent }
];
