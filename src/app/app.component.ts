import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader';

import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public spinnerStyle = Spinkit;    //spinner object
  title = 'git-clone';
  usersList: User[];
  isDataReady: boolean;
  repoList: Repo[];
  showUserDetailsModal: boolean;

  constructor(private userService: UserService) {
    this.usersList = [];
    this.isDataReady = false;
  }

  ngOnInit() {    
    this.getAllUsersList();
  }

  /**
   * calls user service to fetch the list of all users
   * maps the response to User object
   */
  private getAllUsersList() {

    this.userService.getAllUsers().subscribe((res: any[]) => {
      for (let record of res) {
        let user: User = {
          id: record.id,
          login: record.login,
          reposUrl: record.repos_url,
          avatar: record.avatar_url
        };
        this.usersList.push(user);
      }
      this.isDataReady = true;    
    },
      (error) => {
        console.log('Error while geting users list -' + error);
      });
  }

  /**
   * calls user service to fetch the details of the selected user
   * maps the user details in the Repo object
   *
   * @param user : selected user
   */
  showUserDetails(user: User) {

    this.userService.getUserRepo(user.login).subscribe((res: any[]) => {
      this.repoList = [];
      let repo: Repo;
      for(let item of res) {
        repo = {
          id: item.id,
          name: item.name,
          desc: item.description,
          url: item.html_url
        }
        this.repoList.push(repo);
      }
      this.showUserDetailsModal = true;
    },
    (error) => {
      console.log('Error while fetching repoitory details -  ' + error);
    });
  }

}

export interface User {
  login: string,
  id: number,
  reposUrl: string,
  avatar: string
}

export interface Repo {
  id: number,
  name: string,
  url: string,
  desc: string
}