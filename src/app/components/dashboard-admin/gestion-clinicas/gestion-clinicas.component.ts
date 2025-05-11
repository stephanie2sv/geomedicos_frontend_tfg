import { Component } from '@angular/core';
import { ClinicasListAdminComponent } from "../clinicas-list-admin/clinicas-list-admin.component";

@Component({
  selector: 'app-gestion-clinicas',
  standalone: true,
  imports: [ClinicasListAdminComponent],
  templateUrl: './gestion-clinicas.component.html',
  styleUrl: './gestion-clinicas.component.css'
})
export class GestionClinicasComponent {

}
