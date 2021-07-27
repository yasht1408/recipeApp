import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user) this.isAuthenticated= true;
    })
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.isAuthenticated = false;
    this.authService.logout();
  }
}
