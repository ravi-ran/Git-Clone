import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private userListApi = 'https://api.github.com/users?since=135';
  private userRepoApi = 'https://api.github.com/users/'

  /**
   * calls third party api to get the list of all users
   */
  getAllUsers() {
    return this.http.get(this.userListApi);
  }

  /**
   * calls third party api to fetch the details of selected user using their login name
   *
   * @param login : login name of the selected user
   */
  getUserRepo(login: string) {
    return this.http.get(this.userRepoApi + login + '/repos');
  }
}
