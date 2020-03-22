import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICountry } from '../../shared/models/test.models';
import { DataService } from '../../core/data.service';
import { UiService } from '../../core/ui.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '../../shared/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  subscriptions: Subscription[] = [];
  countries: ICountry[] = [];
  name = '';

  constructor(private dataService: DataService, private uiService: UiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    let sub = this.dataService.getCountries().subscribe(res => {
      this.countries = res;
    });
    this.subscriptions.push(sub);
  }

  updateCountry(country: ICountry) {
    let sub = this.dataService.updateCountry(country).subscribe(() => {

    }, error => {
      console.log(error);
      this.uiService.showErrorSnack('An error occured. View console log');
    });
    this.subscriptions.push(sub);
  }

  deleteCountry(country: ICountry) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: '',
        message: 'Country will be deleted! continue?',
        okText: 'YES',
        cancelText: 'NO'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var sub = this.dataService.deleteCountry(country.id).subscribe(() => {
          var index = this.countries.findIndex(a => {
            return a.id == country.id;
          });
          this.countries.splice(index, 1);
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

  addCountry(name: string) {
    let sub = this.dataService.newCountry(name).subscribe(res => {
      let country: ICountry = {
        id: res,
        name: name,
        cities: []
      };
      this.countries.push(country);
      this.name = '';
    });
    this.subscriptions.push(sub);
  }

}
