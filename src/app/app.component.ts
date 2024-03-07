import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme/theme.service';
import { Glow, Skew } from '@ngx-jc-tools/effects';
import { FadeInComponent } from './components/fade-in/fade-in.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { default as email } from '../assets/email.json'

@Component({
  selector: 'ngp-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Glow,
    Skew,
    FadeInComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  protected sideBar: boolean = false;
  protected contacFrom!: FormGroup;
  protected send_stattus?: string;

  public constructor (
    protected _theme: ThemeService,
    private _frm: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.contacFrom = this._frm.group(
      {
        'name': new FormControl<string | null>(null, [Validators.required]),
        'email': new FormControl<string | null>(null, [Validators.required, Validators.email]),
        'body': new FormControl<string | null>(null, [Validators.required]),
      }
    )
  }

  protected async SendMail(): Promise<void> {
    if(this.contacFrom.valid) {
      this.send_stattus = 'Enviando mensaje &#128566;'
    await emailjs
      .send(email.s, email.t, this.contacFrom.getRawValue(), { 'publicKey': email.k })
      .then(
        async () => await new Promise<void>((resolve, reject) => {
          this.contacFrom.reset();
          this.send_stattus = 'Mensaje Enviado &#128512;'
          setTimeout(() => {
            this.send_stattus = undefined;
            resolve();
          }, 5000);
        }),
        async (error: EmailJSResponseStatus) => await new Promise<void>((resolve, reject) => {
          this.contacFrom.reset();
          this.send_stattus = `Error enviado mensaje: ${error.status} - ${error.text} &#128531;`
          setTimeout(() => {
            this.send_stattus = undefined;
            resolve();
          }, 5000);
        })
      );
    }
  }
}
