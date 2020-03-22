import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DataService } from '../../core/data.service';
import { AutoUnsubscribe } from '../../shared/auto-unsubscribe';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ICompany } from '../../shared/models/test.models';
import { AlertDialogComponent } from '../../shared/components/alert-dialog/alert-dialog.component';

@AutoUnsubscribe
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  companies: ICompany[] = [];
  subscriptions: Subscription[] = [];

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    let sub = this.dataService.getCompanies().subscribe(res => {
      this.companies = res;
    });
    this.subscriptions.push(sub);
  }

  selectCompany(company: ICompany) {
    if (company.expand) {
      company.expand = false;
      return;
    }

    this.companies.map(a => a.expand = false);
    company.expand = true;
    if (!company.loaded) {
      company.loading = true;
      this.dataService.getCompany(company.id).subscribe(res => {
        company = res;
        company.loaded = true;
        company.loading = false;
        company.expand = true;
        const index = this.companies.findIndex(a => a.id === company.id);
        this.companies[index] = company;
      });
    }
  }

  deleteCompany(company: ICompany) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: '',
        message: 'Company will be deleted! continue?',
        okText: 'YES',
        cancelText: 'NO'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var sub = this.dataService.deleteCompany(company.id).subscribe(res => {
          var index = this.companies.findIndex(a => {
            return a.id == company.id;
          });
          this.companies.splice(index, 1);
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
}
