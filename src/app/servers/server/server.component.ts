import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  allowEdit:number = 0;
  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.server = this.serversService.getServer(1);
    this.route.params.subscribe((urlparams: Params) => {
      this.server = this.serversService.getServer(+urlparams['id'])
      }
    )
    this.route.queryParams.subscribe((urlquery: Params) => {
      this.allowEdit = +(urlquery['allowEdit']);
    })
  }
  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'})
  }
}
