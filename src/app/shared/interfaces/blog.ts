import { Data } from '@angular/router';

export interface Blog {
  id: number;
  postedBy: string;
  topic: string;
  date: Date;
  message: string;
}
