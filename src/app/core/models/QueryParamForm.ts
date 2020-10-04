interface IQueryParamForm {
  // Example
  // ?search=John
  // ?search=name:John
  // ?search=name:John%20Doe

  // Search any field for multiple keywords,
  // ?search=first keyword;second keyword

  // Search in specific field,
  // ?search=field:keyword here

  // Search in specific fields for multiple keywords,
  // ?search=field1:first field keyword;field2:second field keyword

  // Define query condition,
  // ?search=field:keyword&searchFields=name:like

  // Define search fields for search (&) ?search=name:John&email:john@main.com
  // Define search fields for search (;) ?search=name:John;email:john@main.com

  // Define the query condition for search
  // ?searchFields=name:like
  // ?searchFields=email:=
  // ?searchFields=name:like;email:=
  // ?search=git&searchFields=url:like

  search?: string;
  orderBy?: string; // ?orderBy=created_at&sortedBy=desc
  sortedBy?: 'asc'; // Use together with orderBy asc/desc
  filter?: string; // To get specific columns e.g. ?filter=id;status
  page?: number; // To get page, in paginated data e.g. ?page=50
  limit?: number; // To limit number of rows e.g. ?limit=50
  include?: string; // To include relationships e.g. ?include=tags,user
}

export class QueryParamForm implements IQueryParamForm {}
