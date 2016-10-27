
import * as express from "express";

export class UsersController {

  constructor() {
  }

  public getUsers(req: express.Request,
               res: express.Response, next: express.NextFunction) {

    let users = ()=> {
      return this.retrieveUsers();
    };
    res.send(users());
  }

  private retrieveUsers() : string {
    return 'TODO: Get the users as json.'
  }
}
