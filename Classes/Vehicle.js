export default class Vehicle {
    vehicleNumber;
    startingMiles;
    januaryMiles;
    februaryMiles;
    marchMiles;
    aprilMiles;
    mayMiles;
    juneMiles;
    julyMiles;
    augustMiles;
    septemberMiles;
    octoberMiles;
    novemberMiles;
    decemberMiles;
    totalYearlyMiles;
    endingMiles;

    constructor(row) {
        this.vehicleNumber = row.vehicleNumber;
        this.startingMiles = row.startingMiles;
        this.januaryMiles = row.januaryMiles;
        this.februaryMiles = row.februaryMiles;
        this.marchMiles = row.marchMiles;
        this.aprilMiles = row.aprilMiles;
        this.mayMiles = row.mayMiles;
        this.juneMiles = row.juneMiles;
        this.julyMiles = row.julyMiles;
        this.augustMiles = row.augustMiles;
        this.septemberMiles = row.septemberMiles;
        this.octoberMiles = row.octoberMiles;
        this.novemberMiles = row.novemberMiles;
        this.decemberMiles = row.decemberMiles;
        this.totalYearlyMiles = row.totalYearlyMiles;
        this.endingMiles = row.endingMiles;
    }
}