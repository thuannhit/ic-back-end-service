/**
 * @author Lastmile-Worksのタンビン
 * @namespace Utilities
 * @classname DatetimeUtil
 **/
export default class DatetimeUtil {
  /**
   * Get Current DateTime
   * @author Lastmile-Worksのタンビン
   * @method sync
   * @param none
   * @returns Date
   **/
  static getCurrentDateTime(): Date {
    let date = new Date();
    return new Date(date.toString().replace(/GMT.*$/, 'GMT'));
  }

    /**
   * Convert Date String To Unix TimeStamp
   * @author Lastmile-Worksのタンビン
   * @method sync
   * @param none
   * @returns Date
   **/
  static convertDateStringToTimeStamp(date: Date): number {
    return Math.round(date.getTime()/1000);
  }
}
