import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { parseOfficeAsync } from 'officeparser';
import writeXlsxFile from 'write-excel-file/node';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let filePath = 'files/output.xlsx';


class Report {
    date;
    vehicleNumber;
    vin;
    driver;
    currentMileage;
    lastOilChangeDate;
    lastOilChangeMileage;
    plateNumber;
    renewalDate;
    safetyinspectionDate;

    constructor(args) {
        this.date = new Date(args[0].split(':')[1].trim()).toDateString();
        this.vehicleNumber = args[1].split(':')[1].trim();
        this.vin = args[2].split(':')[1].trim();
        this.driver = args[3].split(':')[1].trim();
        this.currentMileage = parseInt(args[4].split(':')[1].replace('_', '').replace(',', '').trim());
        this.lastOilChangeDate = new Date(args[5].split(':')[1].substring(0, 10).trim()).toDateString();
        this.lastOilChangeMileage = parseInt(args[5].split(':')[2].replace(',', '').replace('_', '').trim());
        this.plateNumber = args[6].split(':')[1].replace('Renewal Date', '').trim();
        this.renewalDate = args[6].split(':')[2].trim();
        this.safetyinspectionDate = args[7].split(':')[1].trim();
    }
}

const schema = [
    {
        column: 'Date',
        type: String,
        value: (report) => report.date
    },
    {
        column: 'Vehicle Number',
        type: String,
        value: (report) => report.vehicleNumber
    },
    {
        column: 'VIN',
        type: String,
        value: (report) => report.vin
    },
    {
        column: 'Driver',
        type: String,
        value: (report) => report.driver
    },
    {
        column: 'Current Mileage',
        type: Number,
        value: (report) => report.currentMileage
    },
    {
        column: 'Last Oil Change Date',
        type: String,
        value: (report) => report.lastOilChangeDate
    },
    {
        column: 'Last Oil Change Mileage',
        type: Number,
        value: (report) => report.lastOilChangeMileage
    },
    {
        column: 'Plate Number',
        type: String,
        value: (report) => report.plateNumber
    },
    {
        column: 'Renewal Date',
        type: String,
        value: (report) => report.renewalDate
    },
    {
        column: 'Safety Inspection Date',
        type: String,
        value: (report) => report.safetyinspectionDate
    }
]


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
        const objects = [report];
        await writeXlsxFile(objects, { schema, filePath });
        console.log('Excel Written!')
    }
});
