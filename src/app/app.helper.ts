var AppHelper = {
  convertToDate(date: Date) {
    let dateString = date.toString();

    let year = dateString.substring(0, 4);
    let month = dateString.substring(5, 7);
    let day = dateString.substring(8, 10);

    let newDateString = month + '/' + day + '/' + year;

    let convertedDate = new Date(newDateString);

    return convertedDate;
  },
};

export default AppHelper;
