import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  public linkTheme= document.querySelector('#theme');
  public check;
  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
   
this.settingsService.CheckCurrentTheme();
  }

  ChangeColor(theme:string){

 this.settingsService.ChangeColor(theme)

  }


}
