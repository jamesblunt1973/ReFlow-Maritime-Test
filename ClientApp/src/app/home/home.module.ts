import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './company/company.component';

const routes: Routes = [
  { path: '', component: CompaniesComponent },
  { path: 'company', component: CompanyComponent }
];

@NgModule({
  declarations: [CompaniesComponent, CompanyComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
