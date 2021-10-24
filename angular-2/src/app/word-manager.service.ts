import { Injectable } from '@angular/core';
import { of } from 'rxjs'
import { filter, mergeMap, toArray, delay } from 'rxjs/operators'
import { TranslateService } from './translate.service';
import { StorageService } from './storage.service'
import { Word } from './types/word'

// Сервис добавления слов - запрашивает переводы, сохраняет в LS
@Injectable({
  providedIn: 'root'
})
export class WordManagerService {

  constructor(
    private translate: TranslateService,
    private storage: StorageService
  ) { }

  processTranlate(value: string, dictionary: Word[]) {
    return of(...value.split(','))
            .pipe(
              filter(w => !dictionary.find(item => item.word.toLowerCase() === w.toLowerCase())),
              mergeMap(w => this.translate.translateWord(w, this.storage.settings.lang)),
              delay(500),
              toArray(),
              mergeMap(res => this.storage.addWordsToDictionary(res))
            )
  }
}
