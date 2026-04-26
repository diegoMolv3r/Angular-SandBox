import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterForm } from "./reactive-forms/register-form/register-form";
import { LoginForm } from "./reactive-forms/login-form/login-form";

@Component({
  selector: 'app-root',
  imports: [CommonModule, RegisterForm, LoginForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SandBox');
}

