import dotenv from 'dotenv';
dotenv.config();

export const PORT        = process.env.PORT || 3000;
export const FREEZE_DAYS = Number(process.env.FREEZE_DAYS) || 21;
export const TOP15_CRON  = process.env.TOP15_CRON || '0 0 * * MON';
