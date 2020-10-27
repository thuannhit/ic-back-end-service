/**
 * @author Lastmile-Worksのタンビン
 * @namespace Utilities
 * @classname ValidationUtil
 **/
export default class ValidationUtil {

  /**
   * Validation any is number
   * @author Lastmile-Worksのタンビン
   * @method sync
   * @param oibject: any
   * @returns true if is number
   **/
  validNumber(obj: any): boolean {

    let result: boolean = false;
    if (!obj) {
      return result;
    }

    let checkObj: string = obj;
    if (!checkObj) {
      return result;
    }

    try {
      const validNumerInt: number = parseInt(checkObj);
      const validNumerFloat: number = parseFloat(checkObj);

      const checkNum: any = new Number(checkObj);
      if (checkNum) {
        if (!isNaN(checkNum)) {
          result = true;
        }
      }
    } catch (error) {
      return result;
    }

    return result;
  }

}

export const isValidEmail = (email: string) => {
  if (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  } else return false
}