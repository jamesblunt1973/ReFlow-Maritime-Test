import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DataService } from '../../core/data.service';
import { UiService } from '../../core/ui.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { IUser } from '../../shared/models/test.models';
import { AlertDialogComponent } from '../../shared/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  subscriptions: Subscription[] = [];
  users: IUser[] = [];
  name = '';

  constructor(private dataService: DataService, private uiService: UiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    let sub = this.dataService.getUsers().subscribe(res => {
      this.users = res;
    });
    this.subscriptions.push(sub);
  }

  updateUser(user: IUser) {
    let sub = this.dataService.updateUser(user).subscribe(() => {

    }, error => {
        console.log(error);
        this.uiService.showErrorSnack('An error occured. View console log');
    });
    this.subscriptions.push(sub);
  }

  deleteUser(user: IUser) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: '',
        message: 'User will be deleted! continue?',
        okText: 'YES',
        cancelText: 'NO'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var sub = this.dataService.deleteUser(user.id).subscribe(() => {
          var index = this.users.findIndex(a => {
            return a.id == user.id;
          });
          this.users.splice(index, 1);
        }, error => {
          console.log(error);
          this.dialog.open(AlertDialogComponent, {
            width: '300px',
            maxWidth: '600px',
            data: {
              icon: 'error',
              message: JSON.stringify(error.errors),
              title: 'An error occurred',
              iconColor: '#c00'
            }
          });
        });
        this.subscriptions.push(sub);
      }
    });
  }

  addUser(name: string) {
    let sub = this.dataService.newUser(name).subscribe(res => {
      let user: IUser = {
        id: res,
        name: name
      };
      this.users.push(user);
      this.name = '';
    });
    this.subscriptions.push(sub);
  }

}
