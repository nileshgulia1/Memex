import { CronJob } from 'cron'

import analytics from '../'
import { STORAGE_KEYS, SCHEDULES, DAY_IN_MS } from '../constants'

const jobs = [
    new CronJob({
        cronTime: SCHEDULES.EVERY_HOUR,
        start: true,
        /**
         * Sends a custom non-user-invoked event to signify an installed extension.
         */
        async onTick() {
            const {
                [STORAGE_KEYS.DAILY_PING]: lastPing,
            } = await browser.storage.local.get({
                [STORAGE_KEYS.DAILY_PING]: 0,
            })

            // If at least a day since the last install ping, do it again and update timestamp
            if (Date.now() - lastPing >= DAY_IN_MS) {
                await analytics.trackEvent({
                    category: 'Periodic',
                    action: 'Install ping',
                })

                await browser.storage.local.set({
                    [STORAGE_KEYS.DAILY_PING]: Date.now(),
                })
            }
        },
    }),
]

export default jobs
