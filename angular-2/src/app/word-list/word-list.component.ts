import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service'
import { TranslateService } from '../translate.service'
import { WordManagerService } from '../word-manager.service'
import { Word } from '../types/word'

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent implements OnInit {

  constructor(
    private storageService: StorageService,
    private wordManager: WordManagerService
  ) { }

  addWordMode: boolean = false
  newWordArea: string = ''
  dictionary: Word[] = []
  message: string = ''

  ngOnInit(): void {
    this.getDictionary()
  }

  getDictionary(): void {
    this.storageService.getDictionary()
      .subscribe(dictionary => this.dictionary = dictionary)
  }

  addWord(): void {
    this.message = 'Переводим'

    this.wordManager.processTranlate(this.newWordArea, this.dictionary)
      .subscribe(res => {
        this.getDictionary()
        this.message = ''
        this.newWordArea = ''
        this.addWordMode = false
      })  
  }
}
