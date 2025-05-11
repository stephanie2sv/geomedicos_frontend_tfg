import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../../auth/interfaces/iuser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css'
})
export class UsuariosListComponent {
  @Input() usuarios: IUser[] = [];

  @Output() toggleActivo = new EventEmitter<IUser>(); 

  onToggle(usuario: IUser): void {
    this.toggleActivo.emit(usuario);
  }
}
