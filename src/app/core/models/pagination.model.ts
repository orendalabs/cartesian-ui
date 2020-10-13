interface IPaginationLinks {
  next?: string;
  previous?: string;
}

export interface IPaginationModel {
  count?: number; // current page count
  current_page?: number; // current page
  links?: IPaginationLinks; // next previous
  per_page?: number; // limit per page
  total?: number; // total records
  total_pages?: number; // total pages
}
