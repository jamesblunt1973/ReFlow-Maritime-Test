import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialComponentsModule } from './material.module';


@NgModule({
  declarations: [
    ConfirmDialogComponent,
    AlertDialogComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialComponentsModule
  ],
  exports: [
    CommonModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogComponent,
    AlertDialogComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    AlertDialogComponent
  ]
})
export class SharedModule { }
