import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';
import { StorageService  } from '../storage.service';
import { Word } from '../types/word'
import { Settings } from '../types/settings';
import { DEFAULT_SETTINGS } from '../default-data/default-settings';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @Input()
  activeTab: number = 0
  
  isStartedEducation: boolean = false
  isDone: boolean = false
  settings: Settings = DEFAULT_SETTINGS
  time: number = this.settings.timeForEx
  wordCnt: number = this.settings.wordInEx
  dictionary: Word[] = []
  currentWord: Word = {
    word: '',
    translate: ''
  }
  userTranslate: string = ''
  attemptNumber = 0
  result = {
    success: 0,
    error: 0
  }
  timer: any = null

  constructor(
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.storageService.getDictionary().subscribe(d => this.dictionary = d)
    this.updateSettings()
  }

  ngOnChanges(): void {
    if (this.activeTab !== 1) {
      // Остановить упражнение при переходе на другой таб
      this.resetEducation()
    }
  }

  userAnswer () {
    const isSuccess = this.userTranslate.toLowerCase() === this.currentWord.translate.toLowerCase()
    isSuccess ? this.result.success++ : this.result.error++

    this.attemptNumber++
    this.userTranslate = ''
    this.nextAttempt()
  }

  nextAttempt () {
    if (this.attemptNumber >= this.wordCnt) {
      this.stopEducation()
      return
    }

    this.currentWord = this.dictionary[Math.floor(Math.random() * (this.dictionary.length - 1))]
  }

  updateSettings () {
    this.storageService.getSettings()
      .subscribe(s => {
        this.settings = s
        this.time = s.timeForEx
        this.wordCnt = s.wordInEx
      })
  }

  startEducation () {
    this.updateSettings()
    this.timer = interval(1000)
      .subscribe(val => {
        if (this.time <= 0) {
          this.isDone = true
          this.stopEducation()
        }

        this.time -= 1
      })

    this.isStartedEducation = true
    this.isDone = false
    this.time = this.settings.timeForEx
    this.nextAttempt()
  }

  resetEducation () {
    this.stopEducation()
    this.isStartedEducation = false
    this.isDone = false
  }

  stopEducation () {
    this.isDone = true
    this.isStartedEducation = false
    this.userTranslate = ''
    this.attemptNumber = 0

    if (this.timer) {
      this.timer.unsubscribe()
    }
  }
}
