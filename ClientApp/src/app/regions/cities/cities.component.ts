import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../core/data.service';
import { UiService } from '../../core/ui.service';
import { ICity } from '../../shared/models/test.models';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '../../shared/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  subscriptions: Subscription[] = [];
  cities: ICity[] = [];
  name = '';
  countryId: number = 0;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private uiService: UiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.countryId = +params.get('id');
      let sub = this.dataService.getCities(this.countryId).subscribe(res => {
        this.cities = res;
      });
      this.subscriptions.push(sub);
    });
  }

  updateCity(city: ICity) {
    let sub = this.dataService.updateCity(city).subscribe(() => {

    }, error => {
      console.log(error);
      this.uiService.showErrorSnack('An error occured. View console log');
    });
    this.subscriptions.push(sub);
  }

  deleteCity(city: ICity) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: '',
        message: 'City will be deleted! continue?',
        okText: 'YES',
        cancelText: 'NO'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var sub = this.dataService.deleteCity(city.id).subscribe(() => {
          var index = this.cities.findIndex(a => {
            return a.id == city.id;
          });
          this.cities.splice(index, 1);
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

  addCity(name: string) {
    let sub = this.dataService.newCity(name, this.countryId).subscribe(res => {
      let city: ICity = {
        id: res,
        name: name,
        countryId: this.countryId
      };
      this.cities.push(city);
      this.name = '';
    });
    this.subscriptions.push(sub);
  }

}
