// Local storage keys used for analytics-related logic
export const STORAGE_KEYS = {
    // Used for timestamp of last daily ping (tracks rough # of installs)
    DAILY_PING: 'last-daily-ping-timestamp',

    // Used for timestamp of last weekly ping (tracks # of in/active users)
    WEEKLY_PING: 'last-weekly-ping-timestamp',

    // Used for timestamp of last search (user needs 1 search in last week to be active)
    SEARCH: 'last-search-timestamp',
}
