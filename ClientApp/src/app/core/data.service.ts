import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { ICompany, ICountry, ICity, IUser } from '../shared/models/test.models';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  private companiesUrl = environment.apiUrl + 'companies';
  private countriesUrl = environment.apiUrl + 'countries';
  private citiesUrl = environment.apiUrl + 'cities';
  private usersUrl = environment.apiUrl + 'users';

  getCompanies() {
    return this.http.get<ICompany[]>(this.companiesUrl);
  }

  getCompany(id: number) {
    return this.http.get<ICompany>(this.companiesUrl + '/' + id);
  }

  newCompany(model) {
    return this.http.post<ICompany>(this.companiesUrl, model);
  }

  updateCompany(model, id) {
    return this.http.put(this.companiesUrl + '/' + id, model);
  }

  updateCompanyUser(companyId: number, userId: number) {
    let model = {
      companyId: companyId,
      userId: userId
    };
    return this.http.post(this.companiesUrl + '/updateCompanyUser', model);
  }

  deleteCompany(id: number) {
    return this.http.delete(this.companiesUrl + '/' + id);
  }

  // Countries
  getCountries() {
    return this.http.get<ICountry[]>(this.countriesUrl);
  }

  updateCountry(country: ICountry) {
    return this.http.put(this.countriesUrl, country);
  }

  deleteCountry(id: number) {
    return this.http.delete(this.countriesUrl + '/' + id);
  }

  newCountry(name: string) {
    return this.http.post<number>(this.countriesUrl, { name: name });
  }

  // Cities
  getCities(id: number) {
    return this.http.get<ICity[]>(this.citiesUrl + '/' + id);
  }

  updateCity(city: ICity) {
    return this.http.put(this.citiesUrl, city);
  }

  deleteCity(id: number) {
    return this.http.delete(this.citiesUrl + '/' + id);
  }

  newCity(name: string, countryId: number) {
    return this.http.post<number>(this.citiesUrl, { name: name, countryId: countryId });
  }

  // Users
  getUsers() {
    return this.http.get<IUser[]>(this.usersUrl);
  }

  newUser(name: string) {
    return this.http.post<number>(this.usersUrl, { name: name });
  }

  updateUser(user: IUser) {
    return this.http.put(this.usersUrl, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.usersUrl + '/' + id);
  }
}
