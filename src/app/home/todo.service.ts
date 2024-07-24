import { HttpClient } from '@angular/common/http';
import { DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { Todo } from '../models';
import { catchError, delay, map, Observable } from 'rxjs';
import { setErrorMessage } from '../utility/errorHandling';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  #todoUrl = 'https://jsonplaceholder.typicode.com/todos';

  // Services
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  todos = signal<Todo[]>([]);
  selectedMemberId = signal<number | undefined>(undefined);
  errorMessage = signal('');

  eff = effect(() => {
    const id = this.selectedMemberId();
    if (id) {
      this.getTodos(id)
        .pipe(
          delay(1000), // Simulate a delay
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((todos) => this.todos.set(todos));
    }
  });

  setMemberId(memberId: number): void {
    this.todos.set([]); // Clear the todos from the prior selection
    this.selectedMemberId.set(memberId);
  }

  private getTodos(id: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.#todoUrl}?userId=${id}`).pipe(
      //Cut the lenght of the long strings
      map((data) =>
        data.map((t) =>
          t.title.length > 20
            ? { ...t, title: t.title.substring(0, 20) + '...' }
            : t
        )
      ),
      catchError((err) => {
        this.errorMessage.set(setErrorMessage(err));
        return [];
      })
    );
  }
}
