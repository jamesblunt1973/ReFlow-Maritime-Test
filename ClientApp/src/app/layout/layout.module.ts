import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from '../core/auth.guard';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '', component: ContainerComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'regions',
        loadChildren: () => import('../regions/regions.module').then(m => m.RegionsModule),
        canLoad: [AuthGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
      }
    ]
  }
];

@NgModule({
  declarations: [
    ContainerComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LayoutModule { }
