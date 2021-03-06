import {Component, OnInit} from '@angular/core';
import {DataSharingService} from '../../services/dataSharing/data-sharing.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean;
  username: string;

  constructor(private dataSharingService: DataSharingService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService) {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
      this.username = this.tokenStorageService.getUsername();
    });
    this.authService.svShouldRefresh.subscribe(() => {
      this.isUserLoggedIn = false;
    });
  }

  ngOnInit(): void {
    if (window.sessionStorage.length > 0) {
      this.isUserLoggedIn = true;
      this.username = this.tokenStorageService.getUsername();
    }
  }

  logout(): void {
    window.sessionStorage.clear();
    this.isUserLoggedIn = false;
    this.router.navigateByUrl('/');
  }
}
