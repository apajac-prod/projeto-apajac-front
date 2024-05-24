/* export default function dateToAge(birthdate: Date) {
    var diff_ms = Date.now() - birthdate.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  } */

import dayjs, { Dayjs } from "dayjs";


export default function birthdateToAge(birthdate: Dayjs) {
    return dayjs().year() - birthdate.year();
  }