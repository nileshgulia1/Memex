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
            const now = Date.now()
            const {
                [STORAGE_KEYS.DAILY_PING]: lastPing,
            } = await browser.storage.local.get({
                [STORAGE_KEYS.DAILY_PING]: 0,
            })

            // If at least a day since the last install ping, do it again and update timestamp
            if (now - lastPing >= DAY_IN_MS) {
                await analytics.trackEvent({
                    category: 'Periodic',
                    action: 'Install ping',
                })

                await browser.storage.local.set({
                    [STORAGE_KEYS.DAILY_PING]: now,
                })
            }
        },
    }),
    new CronJob({
        cronTime: SCHEDULES.EVERY_HOUR,
        start: true,
        /**
         * Sends a custom non-user-invoked event to signifiy user activity based on time since last search.
         */
        async onTick() {
            const now = Date.now()
            const {
                [STORAGE_KEYS.WEEKLY_PING]: lastPing,
                [STORAGE_KEYS.SEARCH]: lastSearch,
            } = await browser.storage.local.get({
                [STORAGE_KEYS.WEEKLY_PING]: 0,
                [STORAGE_KEYS.SEARCH]: 0,
            })

            // If at least a week since the last active user ping, track event
            if (now - lastPing >= DAY_IN_MS * 7) {
                // Event name will indicate whether user is active or not
                await analytics.trackEvent({
                    category: 'Periodic',
                    action: 'User activity ping',
                    name:
                        now - lastSearch >= DAY_IN_MS * 7
                            ? 'active'
                            : 'inactive',
                })

                await browser.storage.local.set({
                    [STORAGE_KEYS.WEEKLY_PING]: now,
                })
            }
        },
    }),
]

export default jobs
