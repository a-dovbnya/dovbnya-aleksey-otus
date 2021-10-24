import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from './translate.service'
import { Word } from './types/word'
import { Settings } from './types/settings'
import { WORDS } from './default-data/mock-words'
import { DEFAULT_SETTINGS } from './default-data/default-settings'


// Сервис для хранения слов в local-storage
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  settings = this.getSettingsFromLS()

  getSettings() {
    return of(this.getSettingsFromLS())
  }

  getDictionary(): Observable<Word[]> {
    return of(this.getDictionaryFromLs())
  }

  getSettingsFromLS() {
    const settings = localStorage.getItem('dictionarySettings')

    if(settings) {
      return JSON.parse(settings)
    }

    this.saveSettingsToLs(DEFAULT_SETTINGS)

    return DEFAULT_SETTINGS
  }

  saveSettingsToLs(settings: Settings) {
    localStorage.setItem('dictionarySettings', JSON.stringify(settings))
    this.getSettingsFromLS()
  }

  // Получает словарь из LS
  getDictionaryFromLs () {
    const dictionary = localStorage.getItem('dictionary')

    if (dictionary) {
      return JSON.parse(dictionary)
    }

    // Для примера добавим немного слов
    this.saveDictionaryToLS(WORDS)

    return WORDS
  }

  // Сохраняет словарь в LS
  saveDictionaryToLS (dictionary: Word[]) {
    localStorage.setItem('dictionary', JSON.stringify(dictionary))
  }

  addWordsToDictionary(words: Word[]): Observable<boolean> {
    return of(words)
            .pipe(
              map(w => {
                this.saveDictionaryToLS(this.getDictionaryFromLs().concat(words))
                return true
              })
            )
  }
}
