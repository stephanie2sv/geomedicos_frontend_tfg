import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarGeneralComponent } from "./components/common/nav-bar-general/nav-bar-general.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarGeneralComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GeoMedicos';
}
