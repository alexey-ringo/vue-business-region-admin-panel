import moment from 'moment'
import Service from './Service'

export default class DateTimeService extends Service {
    // eslint-disable-next-line no-unused-vars
    constructor(name = 'DateTimeService', namespace = null, ...args) {
        super(name, namespace)
    }

    /**
   * @param {int} minutes
   * @returns {{hours: int, minutes: int}}
   */
    // eslint-disable-next-line class-methods-use-this
    getHoursAndMinutes(minutes) {
        const hours = Math.floor(minutes / 60)
        return {
            hours,
            minutes: Math.max(minutes - hours * 60, 0)
        }
    }

    getDaysHoursAndMinutes(minutes) {
        const fullDays = Math.floor(minutes / (60 * 24))
        const remainsMinutes = Math.max(minutes - fullDays * 24 * 60, 0)
        const hoursAndMinutes = this.getHoursAndMinutes(remainsMinutes)
        return {
            fullDays, ...hoursAndMinutes
        }
    }

    /**
   *
   * @param {string} dateTime
   * @param {string} format
   * @returns string
   */
    formatDateTimeUtc(dateTime, format = 'DD.MM.YYYY') {
        return moment.utc(dateTime).format(format)
    }

    formatDateTime(dateTime, format = 'DD.MM.YYYY') {
        return moment(dateTime).format(format)
    }

    formatDateTimeHhMm(dateTime, format = 'DD.MM.YYYY HH:mm') {
        return moment(dateTime).format(format)
    }

    formatDateTimeMonth(dateTime, format = 'MM.YYYY') {
        return moment(dateTime).format(format)
    }

    nearestFormatDateTime(dateTime1, dateTime2, format = 'DD.MM.YYYY') {
        if (moment(dateTime2).isSameOrAfter(dateTime1)) {
            return moment(dateTime1).format(format)
        }
        return moment(dateTime2).format(format)
    }

    farthestFormatDateTime(dateTime1, dateTime2, format = 'DD.MM.YYYY') {
        if (moment(dateTime1).isSameOrBefore(dateTime2)) {
            return moment(dateTime1).format(format)
        }
        return moment(dateTime2).format(format)
    }

    /**
   *
   * @param {string} dateTime
   * @returns Object
   */
    parseDateTime(dateTime) {
        return moment(dateTime).toObject()
    }

    parseDateTimeToDate(dateTime) {
        return moment(dateTime).toDate()
    }

    /**
   *
   * @param {string} dateTime1
   * @param {string} dateTime2
   * @returns Boolean
   */
    isDateTimeAfter(dateTime1, dateTime2) {
        return moment(dateTime1).isAfter(moment(dateTime2))
    }

    /**
   *
   * @param {string} dateTime1
   * @param {string} dateTime2
   * @returns Boolean
   */
    isDateTimeSameOrAfter(dateTime1, dateTime2) {
        return moment(dateTime1).isSameOrAfter(moment(dateTime2))
    }

    /**
   *
   * @param {string} dateTime1
   * @param {string} dateTime2
   * @returns Boolean
   */
    isDateTimeBefore(dateTime1, dateTime2) {
        return moment(dateTime1).isBefore(moment(dateTime2))
    }

    /**
   *
   * @param {string} dateTime
   * @param {int} minutes
   * @returns String
   */
    addMinutesToDateTime(dateTime, minutes = 0) {
        return moment(dateTime).add(minutes, 'minutes').format('YYYY-MM-DD HH:mm:ss')
    }

    /**
   *
   * @param {string} dateTime1
   * @param {string} dateTime2
   * @returns Object
   */
    intervalBetweenDateTimes(dateTime1, dateTime2) {
        const minutes = Math.abs(moment(dateTime1).diff(moment(dateTime2), 'minutes'))
        const fullDays = Math.floor(minutes / 60 / 24)
        const hoursAndMinutes = this.getHoursAndMinutes(minutes)
        return {
            fullDays,
            ...hoursAndMinutes
        }
    }
}
