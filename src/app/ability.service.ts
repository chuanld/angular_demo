import { Injectable } from '@angular/core';
import { Ability } from './ability';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AbilityService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private abilitiesUrl = 'api/storedAbilities'; // URL to web api

  getAbilities(): Observable<Ability[]> {
    return this.http.get<Ability[]>(this.abilitiesUrl).pipe(
      tap((abilities) => {
        this.log(`fetched (${abilities.length}) abilities`);
        this.saveLocalStorage(abilities);
      }),
      catchError(this.handleError<Ability[]>('getAbilities', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`AbilityService: ${message}`);
  }
  public saveLocalStorage(abilities) {
    localStorage.setItem('abilities', JSON.stringify(abilities));
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
