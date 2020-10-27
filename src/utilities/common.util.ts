/**
 * @author Lastmile-Worksのタンビン
 * @namespace Utilities
 * @classname CommonUtil
 **/
export default class CommonUtil {

  /**
   * create 6 Digits Random Code
   * @author Lastmile-Worksのタンビン
   * @namespace Utilities
   * @method sync
   * @param none
   * @return string
   **/
  create6DigitsRandomCode(): string {
    let code = Math.floor(100000 + Math.random() * 900000);
    return code.toString();
  }

  /**
   * https://blog.abelotech.com/posts/number-currency-formatting-javascript/
   * number format 2665 => 2,665 || 1240.5 => 1,240.5
   * @author Lastmile-Worksのタンビン
   * @namespace Utilities
   * @method sync
   * @param <any>obj
   * @return string
   **/
  formatNumber(obj: any): string {
    if(obj){
      return obj.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    else{
      return '0';
    }
  }

  /**
   * 2015-03-04T00:00:00.000Z => 2015年03月04日
   * formatDateYmd for Japanese
   * @author Lastmile-Worksのタンビン
   * @namespace Utilities
   * @method sync
   * @param dateStr: string
   * @return string
   **/
  public formatDateYmdJP(dateStr: string): string {
    let dateValue = new Date(dateStr);
    return dateValue.getFullYear() + '年' + ('0' + (dateValue.getMonth() + 1)).slice(-2) + '月' + ('0' + dateValue.getDate()).slice(-2) + '日';
  }

  /**
   * formatDateYmd to DateYmd Japanese
   * @author Lastmile-Worksのタンビン
   * @namespace Utilities
   * @method sync
   * @param dateStr: string
   * @return string
   **/
  public formatDateYmdToDateYmdJP(dateStr: string): string {
    //2019-08-01
    let dateValue = this.replaceAt(dateStr, 4, '年');
    dateValue = this.replaceAt(dateValue, 7, '月') + '日';
    return dateValue;
  }

  /**
   * reStructure
   * @author Lastmile-Worksのタンビン
   * @namespace Utilities
   * @method sync
   * @param num
   * @returns string
   **/
  public replaceAt(message: string, index: number, replacement: string) : string {
    return message.substr(0, index) + replacement + message.substr(index + replacement.length);
  }
}
