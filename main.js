import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { parseOfficeAsync } from 'officeparser';
import { inSchema, outSchema } from './Schemas';
import { Report, Vehicle } from './Classes'
import writeXlsxFile from 'write-excel-file/node';
import readXlsxFile from 'read-excel-file/node';
import fs from 'node:fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let filePath = fs.readFileSync('config.txt', { encoding: 'utf8' });
let vehicles = [];

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
