import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Response } from './types/response'
import { Word } from './types/word'

// Сервис для перевода слов
@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(
    private http: HttpClient,
  ) { }

  translateWord(word: string, currentLang: string): Observable<Word> {
    return this.http.get<Response>(`//api.mymemory.translated.net/get?q=${word}&langpair=${currentLang}|ru`)
      .pipe(
        map(res => ({
          word: word,
          translate: res.responseData.translatedText
        })),
        catchError(err => { throw 'Произошла ошибка: ' + err} )
      )
  }
}
