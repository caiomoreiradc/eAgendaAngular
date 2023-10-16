import axios from 'axios';
import { Injectable } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthInitializationService {
  constructor() { }

  async obterChaveDeAutenticacao() {
    const apiUrl = 'https://e-agenda-web-api.onrender.com/api';
    const authPath = '/conta/autenticar';
    const authUrl = apiUrl + authPath;

    const autorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjY2ZlYjdhMS03ODMyLTRjYjItYmY1Ny1mYTgyNGVkZTI4NjYiLCJlbWFpbCI6ImNhaW9AZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6IkNhaW8gQ2FydmFsaG8iLCJuYmYiOjE2OTc0MjcwNzUsImV4cCI6MTY5NzQ1NTg3NSwiaWF0IjoxNjk3NDI3MDc1LCJpc3MiOiJlQWdlbmRhIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdCJ9.mNCaKiu0-pjGpPNlTTckXBMhjnfibPhPPESukq5NP7Y'; 
    
    const credentials = {
      email: 'caio@gmail.com',
      senha: 'Caio@123',
    };

    const headers = {
      Accept: '*/*',
      Authorization: autorization,
      'Content-Type': 'application/json',
    };

    try {
      console.log('Enviando solicitação:', credentials);
      const response = await axios.post(authUrl, credentials, { headers });
      console.log('Response:', response.data);

      const { sucesso, dados } = response.data;

      if (sucesso && dados && dados.chave) {
        environment.apiKey = dados.chave;
      } else {
        console.error('Erro na autenticação');
      }
    } catch (error) {
      console.error('Erro na request de autenticação:', error);
    }
  }

  initializeApp() {
    this.obterChaveDeAutenticacao();
  }
}

export function initializeApp(authService: AuthInitializationService) {
  return () => authService.initializeApp();
}

export const AuthInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: initializeApp,
  deps: [AuthInitializationService],
  multi: true,
};



