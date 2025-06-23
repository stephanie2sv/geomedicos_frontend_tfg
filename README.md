# geomedicos_frontend_tfg
Trabajo final de Ciclo Superior - DAW
> Desarrollado en **Angular 17 + Bootstrap 5** · Dashboard multirrol protegido con **JWT** · Despliegue en **Apache HTTP Server + Apache Tomcat**

---

## ✨ Funcionalidades principales

| Módulo | Descripción | Rol/es habilitados |
|--------|-------------|--------------------|
| **Dashboard** |FullCalendarModule | Admin · DOCTOR · PACIENTE |
| **Gestión CRUD** | Altas, edición y borrado de entidades (Angular Reactive Forms) | Admin |
| **Autenticación JWT** | Registro, login, refresh-token, guardias de ruta | Todos |
| **Control de autorizaciones** | Directivas y pipes personalizados para mostrar/ocultar componentes según rol | Todos |


---

## 🛠 Stack & arquitectura

- **Angular 16** + **Bootstrap 5**  
- **Auth**: JWT (access + refresh) – guardias de ruta e interceptors  
- **API**: Java 17 + Spring Boot (repo backend → `https://github.com/<org>/tfg-backend`)  
- **Despliegue**:  
  - **Apache HTTP Server** sirviendo el `dist/` de Angular  
  - **Apache Tomcat 10** alojando la API Spring  
- **CI/CD**: GitHub Actions con jobs de build y tests para frontend y backend
