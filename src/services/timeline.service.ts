import * as timelineRepo from "../models/repositories/timeline.repo";

interface GetTimelineOptions {
  page: number;
  limit: number;
}

class TimelineService {
  static async getTimeline(userId: string, options: GetTimelineOptions) {
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;
    const timeline = await timelineRepo.getTimelineOfUser(userId, skip, limit);

    return {
      timeline: timeline.map((t) => t.postId),
    };
  }
}

export default TimelineService;
