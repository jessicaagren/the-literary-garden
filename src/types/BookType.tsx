export type BookType = {
  title?: string;
  key: string;
  cover_i?: number;
  description?: string | { value: string };
  first_sentence?: { value: string };
  subjects?: string[];
  genre?: string[];
  authors?: { author: { key: string; name: string } }[];
  publish_date?: string;
  number_of_pages?: number;
  covers?: number[];
};
