import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: number = 0;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.route.params.subscribe((urlparams: Params) => {
      this.server = this.serversService.getServer(+urlparams['id']);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    })
    this.route.queryParams.subscribe((queryParams: Params) => { 
      console.log(queryParams)
      this.allowEdit = +queryParams['allowEdit'];
      console.log(this.allowEdit)
    })
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
