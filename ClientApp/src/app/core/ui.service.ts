import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class UiService {

  private sidebarStatus = new BehaviorSubject<string>('');

  changeSidebarStatus() {
    var currentState = this.sidebarStatus.getValue();
    var nextState = currentState === '' ? 'open' : '';
    this.sidebarStatus.next(nextState);
  }

  getMessage(): Observable<string> {
    return this.sidebarStatus.asObservable();
  }

  constructor(private snackBar: MatSnackBar) { }

  showSuccessSnack(msg: string) {
    this.showSnackBar(msg, 'success-snack-bar');
  }

  showErrorSnack(msg: string) {
    this.showSnackBar(msg, 'error-snack-bar');
  }

  showWarningSnack(msg: string) {
    this.showSnackBar(msg, 'warn-snack-bar');
  }

  private showSnackBar(msg: string, className: string) {
    this.snackBar.open(msg, null, {
      duration: 4000,
      horizontalPosition: 'left',
      verticalPosition: 'top',
      panelClass: className
    });
  }

}
