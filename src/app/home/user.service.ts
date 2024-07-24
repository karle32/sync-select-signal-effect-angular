import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #usersUrl = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient);

  // Retrieve team members and make it read-only
  members = toSignal(this.http.get<User[]>(this.#usersUrl), {
    initialValue: [],
  });
}
