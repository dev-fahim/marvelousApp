
export function today_date() {
    let today = new Date();
    let dd = today.getDate();
    let new_dd = '';

    let mm = today.getMonth() + 1;
    let new_mm = '';
    let yyyy = today.getFullYear();
    if (dd < 10) {
        new_dd = '0' + dd.toString();
    } else {
        new_dd = dd.toString()
    }

    if (mm < 10) {
        new_mm = '0' + mm;
    } else {
        new_mm = mm.toString()
    }
    return yyyy + '-' + new_mm + '-' + new_dd
}