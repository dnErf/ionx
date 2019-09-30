import { Injectable } from '@angular/core';
import { of as ObservableOf, Observable, Subject, Subscription } from 'rxjs';
import { catchError, tap, map, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { CardDeck, Card } from './card.model'

@Injectable()
export class CardService {

  private headers:HttpHeaders;
  private readonly HS_API_URL = 'https://omgvamp-hearthstone-v1.p.rapidapi.com';

  private _$cardsByDeck:Subject<Card[]> = new Subject();
  private _$subscription:Subscription;

  constructor(private http:HttpClient) {
    this.headers = new HttpHeaders({ 'x-rapidapi-key': environment.API_KEY })
  }

  public getAllCardDecks():Observable<CardDeck[]> {
    // return this.http.get<CardDeck[]>(`${this.HS_API_URL}/info`,{ headers: this.headers });
    return this.http.get<CardDeck[]>(`${this.HS_API_URL}/info`, { headers: this.headers })
      .pipe(
        // tap(_allDecks => console.log('fetched card', _allDecks)), // optionals
        catchError(this.handleError('getAllCardDecks', []))
      );
  }

  public getCardsByDeck(cardDeckGroup:string, cardDeck:string):Observable<Card[]> {
   
    // return this.http.get<Card[]>(`${this.HS_API_URL}/cards/${cardDeckGroup}/${cardDeck}`, { headers: this.headers })
    //   .pipe(
    //     take(1),
    //     catchError(this.handleError('getAllCardDecks', []))
    //   )

    let observable = this.http.get<Card[]>(`${this.HS_API_URL}/cards/${cardDeckGroup}/${cardDeck}`, { headers: this.headers })
      
      observable
        .pipe(
          catchError(this.handleError('getCardsByDeck', []))
        )
        .subscribe(
          res => {
            this._$cardsByDeck.next(Array.from(res))
          }
        )

    return this._$cardsByDeck

  }

  public getCardById(cardId:string):Observable<Card[]> {
    return this.http.get<Card[]>(`${this.HS_API_URL}/cards/${cardId}`, { headers: this.headers })
  }

  public replaceCardTextLine(text: string) {
    return text ? text.replace(new RegExp('\\\\n', 'g'), ', ') : 'No Description';
  }

  private handleError<T> (operation = 'operation', result?:T) {
    return (error:any):Observable<T> => {
      console.error(error);
      return ObservableOf(result as T);
    }
  }

}