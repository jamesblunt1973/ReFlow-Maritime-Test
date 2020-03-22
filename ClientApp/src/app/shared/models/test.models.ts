export interface ICompany {
  id: number,
  name: string,
  address: string,
  cityId: number,
  countryId: number,
  email: string,
  phone: string,

  city: ICity,
  country: ICountry,
  companyUsers: ICompanyUser[]

  expand?: boolean,
  loading?: boolean,
  loaded?: boolean
}

export interface ICompanyUser {
  companyId: number,
  userId: number,
  user: IUser
}

export interface IUser {
  id: number,
  name: string,
  selected?: boolean
}

export interface ICity {
  id: number,
  name: string,
  countryId: number
}

export interface ICountry {
  id: number,
  name: string,
  cities: ICity[]
}
