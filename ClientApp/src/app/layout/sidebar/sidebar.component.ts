import { Component, OnInit } from '@angular/core';
import { UiService } from '../../core/ui.service';
import { IMneuItem } from './menuItem.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: IMneuItem[] = [];

  constructor(private uiService: UiService) { }

  ngOnInit() {

    this.menuItems = [{
      icon: 'business',
      title: 'Manage Companies',
      url: '/home'
    }, {
      icon: 'supervisor_account',
      title: 'Manage Owners',
      url: '/users'
    }, {
      icon: 'language',
      title: 'Manage Countries and Cities',
      url: '/regions'
    }];
  }

  collapseSidebar() {
    this.uiService.changeSidebarStatus();
  }

}
