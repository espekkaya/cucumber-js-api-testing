import moment, { Moment } from 'moment';
import { DATE } from '@support/Enums';

class Dates {

    /**
     *
     */
    public constructor() {
        moment.locale('tr');
    }

    /**
     * Change Internationalizm
     *
     * @param i18n
     */
    public changeLocale(i18n: string): void {
        moment.locale(i18n);
    }

    /**
     *
     * @param format
     */
    public getCurrentDateFormat(format: string): string {
        return moment().format(format);
    }

    /**
     * Get Current Date
     *
     * @returns {*}
     */
    public getCurrentDate(): string {
        return moment().format('LLLL');
    }

    public getCurrentDateTime(): string {
        return moment().format('DD/MM/YYYY HH:mm');
    }

    public getCurrentDateTimeAddDays(days: number): string {
        return moment().add(days, 'days').format('DD/MM/YYYY HH:mm');
    }

    public getCurrentBirthDayDateTimeAddDays(days: number): string {
        return moment().add(days, 'days').format('DD/MM/YYYY');
    }

    public getCurrentDateTimeSubtractDays(days: number): string {
        return moment().subtract(days, 'days').format('DD/MM/YYYY HH:mm');
    }

    /**
     * Add Days
     *
     * @param days
     * @returns {moment.Moment}
     */
    public addDays(days: number): Moment {
        return moment().add(days, 'days');
    }

    /**
     *
     * @param value
     * @param dateType
     * @returns {moment.Moment}
     */
    public subtract(value: number, dateType: DATE): Moment {
        return moment().subtract(value, dateType);
    }

    /**
     *
     * @param date
     * @param compareDate
     * @returns {boolean}
     */
    public isAfter(date: string, compareDate: string): boolean {
        return moment(date).isAfter(compareDate);
    }

    /**
     *
     * @param days
     * @returns {{month: string, year: string, monthShort: string, day: string}}
     */
    public addDaysNGetDateJsonFormat(days: number): { day: string; month: string; monthShort: string; year: string } {
        const date = this.addDays(days);

        return {
            day: date.format('D'),
            month: date.format('MM'),
            monthShort: date.format('MMM'),
            year: date.format('YYYY')
        };
    }

    public convertTextToDate(date: string): string {
        return moment(date, 'LLLL').format("YYYY-MM-DD HH:mm:ss");
    }

    public convertUnixTimeStampToDate(date: number): string {
        return moment.unix(date / 1000).format("YYYY-MM-DD HH:mm:ss");
    }
}

export default new Dates();