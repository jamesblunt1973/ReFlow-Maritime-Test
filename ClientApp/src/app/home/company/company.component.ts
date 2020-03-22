import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../core/data.service';
import { UiService } from '../../core/ui.service';
import { ICity, ICountry, IUser, ICompanyUser } from '../../shared/models/test.models';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  subscriptions: Subscription[] = [];
  countries: ICountry[] = [];
  cities: ICity[] = [];
  companyForm: FormGroup;
  companyId: number = 0;
  users: IUser[] = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: [null, Validators.required],
      countryId: [null, Validators.required],
      cityId: [null, Validators.required],
      address: [null, Validators.required],
      email: [null, Validators.email],
      phone: null
    });

    let sub = this.dataService.getCountries().subscribe(res => {
      this.countries = res;

      this.route.paramMap.subscribe(params => {
        if (params.has('id')) {
          this.companyId = +params.get('id');
          let sub = this.dataService.getCompany(this.companyId).subscribe(res => {
            this.companyForm.patchValue(res);
            this.getCities(res.countryId);
            this.getUsers(res.companyUsers);
          });
          this.subscriptions.push(sub);

        }
      });

    });
    this.subscriptions.push(sub);
  }

  getCities(countryId: number) {
    let country = this.countries.find(a => a.id === countryId);
    if (country.cities)
      this.cities = country.cities;
    else {
      let sub = this.dataService.getCities(country.id).subscribe(res => {
        country.cities = res;
        this.cities = res;
      });
      this.subscriptions.push(sub);
    }
  }

  submit() {
    if (this.companyForm.valid) {
      let formValue = this.companyForm.value;
      const company: any = {
        address: formValue.address,
        cityId: formValue.cityId,
        countryId: formValue.countryId,
        email: formValue.email || '',
        name: formValue.name,
        phone: formValue.phone || ''
      };

      if (this.companyId) {
        company.id = this.companyId;
        let sub = this.dataService.updateCompany(company, this.companyId).subscribe(() => {
          this.uiService.showSuccessSnack('Company updated successfully.');
        }, error => {
          console.log(error);
          this.uiService.showErrorSnack('An error occured. View console log');
        });
        this.subscriptions.push(sub);
        return;
      }

      let sub = this.dataService.newCompany(company).subscribe(res => {
        this.uiService.showSuccessSnack('New company created successfully.');
        this.companyForm.reset();
      }, error => {
        console.log(error);
        this.uiService.showErrorSnack('An error occured. View console log');
      });
      this.subscriptions.push(sub);
    }
  }

  getUsers(companyUsers: ICompanyUser[]) {
    this.users = [];
    let sub = this.dataService.getUsers().subscribe(res => {
      for (let user of res) {
        for (let companyUser of companyUsers) {
          if (companyUser.userId === user.id) {
            user.selected = true;
            break;
          }
        }
        this.users.push(user);
      }
    });
    this.subscriptions.push(sub);
  }

  updateOwner(e) {
    let sub = this.dataService.updateCompanyUser(this.companyId, e.option.value).subscribe(() => {

    }, error => {
        console.log(error);
        this.uiService.showErrorSnack('An error occured. View console log');
    });
    this.subscriptions.push(sub);
  }
}
