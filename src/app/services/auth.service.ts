import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  login(email: string, password: string): void {
    this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['admin/orders']).then();
      })
      .catch(() => {
        alert('Данные введены неверно');
      });
  }

  logout(): void {
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['/login']).then();
    });
  }
}
