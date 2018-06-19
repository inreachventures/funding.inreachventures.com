export const host = process.env.HOST || '';

export const apiHost = process.env.API_HOST || '';

export const sentryDsn = process.env.SENTRY_DSN;

export const gitRevision = process.env.GIT_REVISION || 'unknown';

export const environment = process.env.NODE_ENV || 'development';
