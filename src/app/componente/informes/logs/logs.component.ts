import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Ingreso } from 'src/app/clases/ingreso';
import { LogsService } from 'src/app/services/logs.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  ingresos: Ingreso[] = [];
  constructor(private logservice: LogsService, private userService: UserService) { }

  ngOnInit(): void {
    this.logservice.getLogs().subscribe(logs => {
      this.ingresos = [];
      logs.forEach(log => {
        let l: any = log.log;
        let ts = new Timestamp(l['seconds'], 0);
        log.log = ts.toDate();

      });

      this.ingresos = logs;
    });
  }

}
