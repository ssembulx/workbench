import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class ExportService {

 constructor() { }
 
 exportExcel(jsonData: any[], fileName: string){
  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet('Report Data');
  let testcaseData = jsonData;

  let headerNameList = ['Lab Details','Team','#Bench','Program','SKU','Vendor','Allocated To','From WW','To WW','Duration','Remarks'];
  // let headerRow = worksheet.addRow(headerNameList);
  worksheet.addRow(headerNameList);

         
 testcaseData.forEach((item: any) => {
  let rowList = [item.Location__Name, item.Team, item.BenchData,item.Program, item.Sku, item.Vendor, item.AllocatedTo[0].Name, item.FromWW, item.ToWW,item.Duration, item.Remarks];
  const row = worksheet.addRow(rowList);
  }),
  
  
  workbook.xlsx.writeBuffer().then( (data: any) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        FileSaver(blob, 'ReportData');
      })
 }
}






// import { Injectable } from '@angular/core';
// import * as FileSaver from 'file-saver'
// import * as XLSX from 'xlsx';

// @Injectable({
//   providedIn: 'root'
// })
// export class ExportService {

//   constructor() { }

//   fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//   fileExtension = '.xlsx';

//   public exportExcel(jsonData: any[], fileName: string): void {

//     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
//     const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
//     const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//     this.saveExcelFile(excelBuffer, fileName);
//   }

//   private saveExcelFile(buffer: any, fileName: string): void {
//     const data: Blob = new Blob([buffer], {type: this.fileType});
//     FileSaver.saveAs(data, fileName + this.fileExtension);
//   }
// }
