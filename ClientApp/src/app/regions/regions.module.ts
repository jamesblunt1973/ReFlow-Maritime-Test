import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CitiesComponent } from './cities/cities.component';
import { CountriesComponent } from './countries/countries.component';

const routes: Routes = [
  { path: '', component: CountriesComponent },
  { path: 'cities/:id', component: CitiesComponent }
];

@NgModule({
  declarations: [CountriesComponent, CitiesComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class RegionsModule { }
