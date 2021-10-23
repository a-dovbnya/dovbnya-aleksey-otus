import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor( private storageService: StorageService) { }

  ngOnInit(): void {
  }

  settings = { ...this.storageService.settings }

  saveSettings () {
    this.storageService.saveSettingsToLs(this.settings)
  }

}
