import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { UiService } from '../../core/ui.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuStatus = '';
  userName = '';

  constructor(private uiService: UiService, private auth: AuthService) { }

  ngOnInit() {
    this.uiService.getMessage().subscribe(status => {
      this.menuStatus = status;
    });
    this.auth.getUser$().subscribe(res => {
      console.log(res);
      this.userName = 'Mahdi';
    });
  }

  changeMenuBtn() {
    this.uiService.changeSidebarStatus();
  }

  logout() {
    this.auth.logout();
  }
}
