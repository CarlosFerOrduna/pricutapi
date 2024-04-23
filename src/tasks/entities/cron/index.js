import { CronJob } from 'cron'

export class CronService {
    static createJob(cronTime, onTick) {
        const job = new CronJob(cronTime, onTick)

        job.start()

        return job
    }
}
