let date = new Date();
let dateMonth;
if (date.getMonth().toString().length < 10) {
    dateMonth = `0${date.getMonth() + 1}`;
} else {
    dateMonth = `${date.getMonth() + 1}`;
}
export const todayDate = `${date.getFullYear()}-${dateMonth}-${date.getDate()}`;

