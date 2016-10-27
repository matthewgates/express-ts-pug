import * as express from "express";

export class IndexController {

  public getIndex(req: express.Request,
      res: express.Response, next: express.NextFunction) {

    res.render('index', {title: 'Node'});
  }
}
