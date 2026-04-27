import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginForm } from "./reactive-forms/login-form/login-form";
import { RegisterForm } from "./reactive-forms/register-form/register-form";

@Component({
  selector: 'app-root',
  imports: [CommonModule, LoginForm, RegisterForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SandBox');
}

