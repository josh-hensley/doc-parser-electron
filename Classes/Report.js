export default class Report {
    month;
    vehicleNumber;
    currentMileage;

    constructor(args) {
        const dateString = new Date(args[0].split(':')[1].trim()).toDateString();
        this.month = 
            dateString.includes('Jan') ? 'January' :
            dateString.includes('Feb') ? 'February' :
            dateString.includes('Mar') ? 'March' :
            dateString.includes('Apr') ? 'April' :
            dateString.includes('May') ? 'May' :
            dateString.includes('Jun') ? 'June' :
            dateString.includes('Jul') ? 'July' :
            dateString.includes('Aug') ? 'August' :
            dateString.includes('Sep') ? 'September' :
            dateString.includes('Oct') ? 'October' :
            dateString.includes('Nov') ? 'November' :
            'December';
        this.vehicleNumber = parseInt(args[1].split(':')[1].split(' ')[0].replace('#', '').trim());
        this.currentMileage = parseInt(args[4].split(':')[1].replace('_', '').replace(',', '').trim());
    }
}