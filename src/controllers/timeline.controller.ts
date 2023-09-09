import { Request, Response } from "express";
import { OKResponse } from "../cores/success.repsonse";
import TimelineService from "../services/timeline.service";

class TimelineController {
  static async getTimeline(req: Request, res: Response) {
    const userId = req.params.userId;
    const { page = 1, limit = 20 } = req.query;
    new OKResponse({
      metadata: await TimelineService.getTimeline(userId, {
        page: +page,
        limit: +limit,
      }),
    }).send(res);
  }
}

export default TimelineController;
