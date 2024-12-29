import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { parseOfficeAsync } from 'officeparser';
import writeXlsxFile from 'write-excel-file/node';
import readXlsxFile from 'read-excel-file/node';
import fs from 'node:fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let filePath = fs.readFileSync('config.txt', { encoding: 'utf8' });
let vehicles = [];

const inSchema = {
    'Vehicle Number': {
        prop: 'vehicleNumber',
        type: Number
    },
    'Starting Miles': {
        prop: 'startingMiles',
        type: Number
    },
    'January': {
        prop: 'januaryMiles',
        type: Number
    },
    'February': {
        prop: 'februaryMiles',
        type: Number
    },
    'March': {
        prop: 'marchMiles',
        type: Number
    },
    'April': {
        prop: 'aprilMiles',
        type: Number
    },
    'May': {
        prop: 'mayMiles',
        type: Number
    },
    'June': {
        prop: 'juneMiles',
        type: Number
    },
    'July': {
        prop: 'julyMiles',
        type: Number
    },
    'August': {
        prop: 'augustMiles',
        type: Number
    },
    'September': {
        prop: 'septemberMiles',
        type: Number
    },
    'October': {
        prop: 'octoberMiles',
        type: Number
    },
    'November': {
        prop: 'novemberMiles',
        type: Number
    },
    'December': {
        prop: 'decemberMiles',
        type: Number
    },
    'Total Yearly Miles': {
        prop: 'totalYearlyMiles',
        type: Number
    },
    'Ending Miles': {
        prop: 'endingMiles',
        type: Number
    }
}

const outSchema = [
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

const getXlsxData = async () => {
    try {
        const data = await readXlsxFile(filePath, {
            schema: inSchema,
            schemaPropertyValueForEmptyCell: null,
            getEmptyObjectValue: () => null
        });
        for (const row of data.rows){
            const vehicle = new Vehicle(row);
            vehicles.push(vehicle);
        }
        console.log(vehicles[0])
    } catch (error) {
        console.log(error.message)
    }
}

if (filePath) getXlsxData(filePath);

class Vehicle {
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

    // getTotalYearlyMiles() {
    //     const milesArr = [
    //         this.januaryMiles ? this.januaryMiles : null,
    //         this.februaryMiles ? this.februaryMiles : null,
    //         this.marchMiles ? this.marchMiles : null,
    //         this.aprilMiles ? this.aprilMiles : null,
    //         this.mayMiles ? this.mayMiles : null,
    //         this.juneMiles ? this.juneMiles : null,
    //         this.julyMiles ? this.julyMiles : null,
    //         this.augustMiles ? this.augustMiles : null,
    //         this.septemberMiles ? this.septemberMiles : null,
    //         this.octoberMilesv ? this.octoberMiles : null,
    //         this.novemberMiles ? this.novemberMiles : null,
    //         this.decemberMiles ? this.decemberMiles : null,
    //     ]
    //     const total = milesArr.reduce((prev, curr) => { return prev ? prev += curr : curr }, 0);
    //     return total;
    // }

    // calculateEndingMiles() {
    //     return this.getTotalYearlyMiles() + this.startingMiles;
    // }

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

class Report {
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

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, 'preload.js')
        }
    });
    win.removeMenu();
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})

ipcMain.handle('handle-doc', async (_, file) => {
    if (file.includes('.xlsx')) {
        filePath = file;
        await getXlsxData(filePath);
        fs.writeFile('config.txt', filePath, () => { console.log('Updated Config.txt') });
        console.log('Set excel sheet to: ', filePath)
    }
    else if (!file.includes('.docx')) {
        console.log('Wrong File Type!')
    }
    else {
        const docText = await parseOfficeAsync(file);
        const docTextArr = docText.split('\n').filter(data => data.includes(":"));
        const report = new Report(docTextArr);
        console.log('Report read: ', report)
        const objects = vehicles.map((vehicle)=>{
            if (vehicle.vehicleNumber === report.vehicleNumber){
                const key = report.month.toLowerCase().concat('Miles');
                vehicle[key] = report.currentMileage - vehicle.endingMiles;
            }
            return vehicle;
        });
        await writeXlsxFile(objects, { schema: outSchema, filePath });
        console.log(`Excel Written to ${filePath}!`)
    }
});
