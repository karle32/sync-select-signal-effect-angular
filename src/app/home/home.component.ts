import { Component, inject } from '@angular/core';
import { UserService } from './user.service';
import { TodoService } from './todo.service';
import { CommonModule } from '@angular/common';

const MODULES = [CommonModule];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [...MODULES],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  pageTitle = 'Team Members and Tasks';

  // Services
  userService = inject(UserService);
  todoService = inject(TodoService);

  members = this.userService.members;

  todosForMember = this.todoService.todos;
  errorMessage = this.todoService.errorMessage;

  // Actions
  onSelectedMember(ele: EventTarget | null): void {
    const id = Number((ele as HTMLSelectElement).value);
    this.todoService.setMemberId(id);
  }

  onSelectedTask(ele: EventTarget | null): void {
    // Do something
  }
}
