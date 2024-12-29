export default outSchema = [
    {
        column: 'Vehicle Number',
        type: Number,
        value: (vehicle) => vehicle.vehicleNumber
    },
    {
        column: 'Starting Miles',
        type: Number,
        value: (vehicle) => vehicle.startingMiles
    },
    {
        column: 'January',
        type: Number,
        value: (vehicle) => vehicle.januaryMiles
    },
    {
        column: 'February',
        type: Number,
        value: (vehicle) => vehicle.februaryMiles
    },
    {
        column: 'March',
        type: Number,
        value: (vehicle) => vehicle.marchMiles
    },
    {
        column: 'April',
        type: Number,
        value: (vehicle) => vehicle.aprilMiles
    },
    {
        column: 'May',
        type: Number,
        value: (vehicle) => vehicle.mayMiles
    },
    {
        column: 'June',
        type: Number,
        value: (vehicle) => vehicle.juneMiles
    },
    {
        column: 'July',
        type: Number,
        value: (vehicle) => vehicle.julyMiles
    },
    {
        column: 'August',
        type: Number,
        value: (vehicle) => vehicle.augustMiles
    },
    {
        column: 'September',
        type: Number,
        value: (vehicle) => vehicle.septemberMiles
    },
    {
        column: 'October',
        type: Number,
        value: (vehicle) => vehicle.octoberMiles
    },
    {
        column: 'November',
        type: Number,
        value: (vehicle) => vehicle.novemberMiles
    },
    {
        column: 'December',
        type: Number,
        value: (vehicle) => vehicle.decemberMiles
    },
    {
        column: 'Total Yearly Miles',
        type: 'Formula',
        value: (vehicle) => `SUM(C${vehicle.vehicleNumber - 100 + 1}:N${vehicle.vehicleNumber - 100 + 1})`
    },
    {
        column: 'Ending Miles',
        type: 'Formula',
        value: (vehicle) => `SUM(B${vehicle.vehicleNumber - 100 + 1}:N${vehicle.vehicleNumber - 100 + 1})`
    },
]