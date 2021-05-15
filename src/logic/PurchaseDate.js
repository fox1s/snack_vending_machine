let date = new Date();
let dateMonth;
if (date.getMonth().toString().length < 10) {
    dateMonth = `0${date.getMonth() + 1}`;
} else {
    dateMonth = `${date.getMonth() + 1}`;
}
const purchaseDate = `${date.getFullYear()}-${dateMonth}-${date.getDate()}`;
export default purchaseDate;
