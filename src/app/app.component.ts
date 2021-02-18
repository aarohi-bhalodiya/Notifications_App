import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalVariable } from './app.global';

//Interface to declare the structure of notifications object from database which will be used prepare array
export interface NotificationsStructure {
  sender_id: string;
  invite: string;
  invite_time: string;
  sig_id: string;
  status: string;
}

interface User {
  user_id: string;
  sender_id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  notifications: NotificationsStructure[] | undefined;
  users: User[] = [];
  selectedUser: string = '';
  displayedColumns: string[] = [
    'sender_id',
    'invite',
    'invite_time',
    'sig_id',
    'status',
  ];
  dataSource = new MatTableDataSource([] as any);
  noRecordsFound = true;
  timer: number = 10;
  setIntervalForCountdown : any;
  timerVal: any;
  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar
  ) {
    
  }

  ngOnInit(): void {
    //call API to get the notifications
    this.getUsers();
  }

  getUsers() {
    //Call API to get all users
    this.http.get(GlobalVariable.GET_USERS).subscribe(
      (data: any) => {
        this.users = data['result'];
        this.selectedUser = this.users[0].user_id;
        this.getNotifications(this.selectedUser);
      },
      (error) => {
        this.snackBar.open(error.error.error, 'close', { duration: 3000 });
      }
    );
  }

  getNotifications(value: string) {
    //Call API to get all notifications by userId
    this.timer = 10;
    this.http.get(GlobalVariable.GET_NOTIFICATIONS + '/' + value).subscribe(
      (data: any) => {
        this.notifications = data['result'];
        if (this.notifications && this.notifications.length > 0) {
          //assign the data to table source data
          this.dataSource.data = this.notifications ? this.notifications : [];
          this.noRecordsFound = false;
          clearTimeout(this.timerVal);
          clearInterval(this.setIntervalForCountdown);
          //set interval of 10 seconds to display time of every 1 second.
          this.setIntervalForCountdown = setInterval(() => {
            this.timer--;
          }, 1000);
          
          //set timeout of 10 second to get updated notifications after 10 seconds.
          this.timerVal = setTimeout(() => {
              this.getUpdatedNotifications();  
            
            //clear interval to stop count down.
            clearInterval(this.setIntervalForCountdown);
          }, 10000);
        } else {
          this.noRecordsFound = true;
        }
      },
      (error) => {
        this.snackBar.open(error.error.error, 'close', { duration: 3000 });
      }
    );
  }

  getUpdatedNotifications() {
    //Call API to get all updated notifications by userId
    this.http
      .get(GlobalVariable.GET_UPDATED_NOTIFICATIONS + '/' + this.selectedUser)
      .subscribe(
        (data: any) => {
          let updatedNotifications = data['result'];
          if (updatedNotifications.length > 0) {
            //assign the data to table source data
            this.dataSource.data = [
              ...this.dataSource.data,
              ...updatedNotifications,
            ];
            this.noRecordsFound = false;
          } else {
            this.noRecordsFound = true;
          }
        },
        (error) => {
          this.snackBar.open(error.error.error, 'close', { duration: 3000 });
        }
      );
  }
}
