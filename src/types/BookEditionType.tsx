export type BookEditionType = {
  publish_date?: string;
  number_of_pages?: number;
  covers?: number[];
  description?: string | { value: string };
  first_sentence?: { value: string };
};
