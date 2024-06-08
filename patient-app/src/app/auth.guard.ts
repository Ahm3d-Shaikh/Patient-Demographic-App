import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

interface TokenPayLoad {
  exp: number;
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if(token) {
    try{
      const decodedToken = jwtDecode<TokenPayLoad>(token);
      const currentTime = Date.now() / 1000;

      if(decodedToken.exp > currentTime) {
        return true;
      }
      else{
        localStorage.removeItem('token');
        localStorage.removeItem('patientId');
        localStorage.removeItem('role');
        router.navigate(['/login']);
        return false;
      }
    }

    catch (error){
      localStorage.removeItem('token');
      localStorage.removeItem('patientId');
      localStorage.removeItem('role');
      router.navigate(['/login']);
      return false;
    }
  }
    else{
      router.navigate(['/login']);
      return false;
    }
};
