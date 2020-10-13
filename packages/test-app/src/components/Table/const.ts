export enum ORDER {
  ASC = 'asc',
  DESC = 'desc'
}

export type PageProps = {
  offset: number; 
  limit: number;
}

export type SortProps = {
  field: string; 
  order: ORDER.ASC | ORDER.DESC | '';
}

export const NUMBER_OF_PAGE: number = 6;

export const PAGES_PARAMS: PageProps = { offset: 0, limit: NUMBER_OF_PAGE };

export const DELAY: number = 500;

export const SKELETON_COUNT: number = 7;