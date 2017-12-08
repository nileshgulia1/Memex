// Local storage keys used for analytics-related logic
export const STORAGE_KEYS = {
    // Used for timestamp of last daily ping (tracks rough # of installs)
    DAILY_PING: 'last-daily-ping-timestamp',

    // Used for timestamp of last weekly ping (tracks # of in/active users)
    WEEKLY_PING: 'last-weekly-ping-timestamp',

    // Used for timestamp of last search (user needs 1 search in last week to be active)
    SEARCH: 'last-search-timestamp',
}

export const DAY_IN_MS = 1000 * 60 * 60 * 24

// Cron schedules for periodic analytics tasks
export const SCHEDULES = {
    // Generates a cron schedule to run some time past the hour, every hour
    EVERY_HOUR: () => `0 ${Math.floor(Math.random() * 60)} * * * *`,
}
