export default function dateToAge(birthdate: Date) {
    var diff_ms = Date.now() - birthdate.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }