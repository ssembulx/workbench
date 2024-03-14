import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor() {}
  downloadBroadcastSummary(jsonData: any[], fileName: string) {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');
    let testcaseData = jsonData;

    let headerNameList = [
      'Created Date',
      'Subject',
      'Broadcast Message',
      'User Mail List',
      'BroadCast By',
    ];
    // let headerRow = worksheet.addRow(headerNameList);
    worksheet.addRow(headerNameList);

    testcaseData.forEach((item: any) => {
      let rowList = [
        item?.CreatedDate,
        item?.Subject,
        item?.Content,
        item?.User_mail_list,
        item?.BroadCast_by?.[0]?.Name,
      ];
      const row = worksheet.addRow(rowList);
    }),
      workbook.xlsx.writeBuffer().then((data: any) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver(blob, fileName);
      });
  }
  downloadLabDetailsList(jsonData: any[], fileName: string) {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');
    let testcaseData = jsonData;

    let headerNameList = [
      'Location',
      'Total Work Bench',
      'Non WSE Counts',
      'WSE Allocated',
      'WSE Free',
      'WSE Counts',
    ];
    // let headerRow = worksheet.addRow(headerNameList);
    worksheet.addRow(headerNameList);

    testcaseData.forEach((item: any) => {
      let rowList = [
        item.Name,
        item.Total_Work_Bench,
        item.NonSIVCounts,
        item.SIVAllocated,
        item.SIVFree,
        item.SIVCounts,
      ];
      const row = worksheet.addRow(rowList);
    }),
      workbook.xlsx.writeBuffer().then((data: any) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver(blob, fileName);
      });
  }

  exportExcel(jsonData: any[], fileName: string) {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');
    let testcaseData = jsonData;

    let headerNameList = [
      'Booking Date',
      'Lab Details',
      'Team',
      '#Bench',
      'Bench Details',
      'Program',
      'SKU',
      'Vendor',
      'Allocated To',
      'From WW',
      'To WW',
      'Duration',
      'Remarks',
      'Approved By',
      'Requested By',
      'Status',
    ];
    // let headerRow = worksheet.addRow(headerNameList);
    worksheet.addRow(headerNameList);

    testcaseData.forEach((item: any) => {
      let rowList = [
        item?.AllocatedDate,
        item.Location__Name,
        item.Team,
        item.BenchData?.length,
        item.BenchData,
        item.Program,
        item.Sku,
        item.Vendor,
        item.AllocatedTo[0].Name,
        item.FromWW,
        item.ToWW,
        item.Duration,
        item.Remarks,
        item.approvedBy,
        item.RequestedBy?.[0]?.Name,
        item.status,
      ];
      const row = worksheet.addRow(rowList);
    }),
      workbook.xlsx.writeBuffer().then((data: any) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver(blob, fileName);
      });
  }

  exportExcelDeallocated(jsonData: any[], fileName: string) {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');
    let testcaseData = jsonData;

    let headerNameList = [
      'Booking Date',
      'Lab Details',
      'Team',
      '#Bench',
      'Bench Details',
      'Program',
      'SKU',
      'Vendor',
      'Allocated To',
      'From WW',
      'To WW',
      'Duration',
      'Remarks',
      'Deallocated By',
      'Deallocated Date',
      'Approved By',
      'Requested By',
      'Status',
    ];
    // let headerRow = worksheet.addRow(headerNameList);
    worksheet.addRow(headerNameList);

    testcaseData.forEach((item: any) => {
      let rowList = [
        item?.AllocatedDate,
        item.Location__Name,
        item.Team,
        item.BenchData?.length,
        item.BenchData,
        item.Program,
        item.Sku,
        item.Vendor,
        item.AllocatedTo[0].Name,
        item.FromWW,
        item.ToWW,
        item.Duration,
        item.Remarks,
        item.DeallocatedBy,
        item.deallocatedDate,
        item.approvedBy,
        item.RequestedBy?.[0]?.Name,
        item.status,
      ];
      const row = worksheet.addRow(rowList);
    }),
      workbook.xlsx.writeBuffer().then((data: any) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver(blob, fileName);
      });
  }

  exportExcelAll(jsonData: any[], fileName: string) {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');
    let testcaseData = jsonData;

    let headerNameList = [
      'Booking Date',
      'Lab Details',
      'Team',
      '#Bench',
      'Bench Details',
      'Program',
      'SKU',
      'Vendor',
      'Allocated To',
      'From WW',
      'To WW',
      'Duration',
      'Remarks',
      'Deallocated By',
      'Deallocated Date',
      'Rejected By',
      'Rejected Date',
      'Rejected Reason',
      'Approved By',
      'Requested By',
      'Status',
    ];
    // let headerRow = worksheet.addRow(headerNameList);
    worksheet.addRow(headerNameList);

    testcaseData.forEach((item: any) => {
      let rowList = [
        item?.AllocatedDate,
        item.Location__Name,
        item.Team,
        item.BenchData?.length,
        item.BenchData,
        item.Program,
        item.Sku,
        item.Vendor,
        item.AllocatedTo[0].Name,
        item.FromWW,
        item.ToWW,
        item.Duration,
        item.Remarks,
        item.DeallocatedBy,
        item.deallocatedDate,
        item.RejectedBy,
        item.RejectedDate,
        item.Reason,
        item.approvedBy,
        item.RequestedBy?.[0]?.Name,
        item.status,
      ];
      const row = worksheet.addRow(rowList);
    }),
      workbook.xlsx.writeBuffer().then((data: any) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver(blob, fileName);
      });
  }

  exportRejectedExcel(jsonData: any[], fileName: string) {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');
    let testcaseData = jsonData;

    let headerNameList = [
      'Booking Date',
      'Lab Details',
      'Team',
      '#Bench',
      'Bench Details',
      'Program',
      'SKU',
      'Vendor',
      'Allocated To',
      'From WW',
      'To WW',
      'Duration',
      'Remarks',
      'Rejected By',
      'Rejected Date',
      'Rejected Reason',
      'Approved By',
      'Requested By',
      'Status',
    ];
    // let headerRow = worksheet.addRow(headerNameList);
    worksheet.addRow(headerNameList);

    testcaseData.forEach((item: any) => {
      let rowList = [
        item?.AllocatedDate,
        item.Location__Name,
        item.Team,
        item.BenchData?.length,
        item.BenchData,
        item.Program,
        item.Sku,
        item.Vendor,
        item.AllocatedTo[0].Name,
        item.FromWW,
        item.ToWW,
        item.Duration,
        item.Remarks,
        item.RejectedBy,
        item.RejectedDate,
        item.Reason,
        item.approvedBy,
        item.RequestedBy?.[0]?.Name,
        item.status,
      ];
      const row = worksheet.addRow(rowList);
    }),
      workbook.xlsx.writeBuffer().then((data: any) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver(blob, fileName);
      });
  }

  downloadForecastSummary(jsonData: any[], fileName: string) {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');
    let testcaseData = jsonData;

    let headerNameList = ['Category', 'Intel', 'ODC', 'Ramp'];
    // let headerRow = worksheet.addRow(headerNameList);
    const HeaderRowOutlet = worksheet.addRow(headerNameList);
    HeaderRowOutlet.eachCell((cell, index) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0072C5' },
        bgColor: { argb: 'FFFFFFFF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.font = { size: 12, bold: true, color: { argb: 'ffffff' } };
      cell.alignment = { vertical: 'bottom', horizontal: 'center' };
      worksheet.getColumn(index).width =
        headerNameList[index - 1].length < 20
          ? 20
          : headerNameList.length[index - 1];
    });
    testcaseData.forEach((item: any) => {
      let rowList = [item.category, item.intel, item.ODC, item.Ramp];
      const row = worksheet.addRow(rowList);
    }),
      workbook.xlsx.writeBuffer().then((data: any) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver(blob, fileName);
      });
  }
  downloadRvpYear(jsonData: any[], fileName: string) {
    debugger;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');
    let testcaseData = jsonData;

    let headerNameList = [
      'Category',
      'Ramp',
      'Intel Bench',
      'Intel Rack',
      'ODC Bench',
      'ODC Rack',
    ];
    // let headerRow = worksheet.addRow(headerNameList);
    const HeaderRowOutlet = worksheet.addRow(headerNameList);
    HeaderRowOutlet.eachCell((cell, index) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0072C5' },
        bgColor: { argb: 'FFFFFFFF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.font = { size: 12, bold: true, color: { argb: 'ffffff' } };
      cell.alignment = { vertical: 'bottom', horizontal: 'center' };
      worksheet.getColumn(index).width =
        headerNameList[index - 1].length < 20
          ? 20
          : headerNameList.length[index - 1];
    });
    testcaseData.forEach((item: any) => {
      let rowList = [
        item?.category,
        item?.Total,
        item?.Bench_Demand_Intel,
        item?.Rack_Demand_Intel,
        item?.Bench_Demand_ODC,
        item?.Rack_Demand_ODC,
      ];
      const row = worksheet.addRow(rowList);
    }),
      workbook.xlsx.writeBuffer().then((data: any) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver(blob, fileName);
      });
  }
  downloadRvpRampQuarterly(
    jsonData: any[],
    fileName: string,
    category: string
  ) {
    debugger;
    if (category == 'Total') {
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Report Data');
      let testcaseData = jsonData;

      //let headerNameList = ['Category', 'Intel', 'ODC', 'Intel %', 'ODC %'];
      let headerNameList = ['Category', 'Intel', 'ODC'];
      // let headerRow = worksheet.addRow(headerNameList);
      const HeaderRowOutlet = worksheet.addRow(headerNameList);
      HeaderRowOutlet.eachCell((cell, index) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '0072C5' },
          bgColor: { argb: 'FFFFFFFF' },
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cell.font = { size: 12, bold: true, color: { argb: 'ffffff' } };
        cell.alignment = { vertical: 'bottom', horizontal: 'center' };
        worksheet.getColumn(index).width =
          headerNameList[index - 1].length < 20
            ? 20
            : headerNameList.length[index - 1];
      });

      testcaseData.forEach((item: any) => {
        let rowList = [
          item?.category,
          item?.intel,
          item?.ODC,
          /*    item?.intel_percentage,
          item?.ODC_percentage, */
        ];
        const row = worksheet.addRow(rowList);
      }),
        workbook.xlsx.writeBuffer().then((data: any) => {
          let blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          FileSaver(blob, fileName);
        });
    } else if (category == 'Average') {
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Report Data');
      let testcaseData = jsonData;

      // let headerNameList = ['Category', 'Intel', 'ODC', 'Intel %', 'ODC %'];
      let headerNameList = ['Category', 'Intel', 'ODC'];
      // let headerRow = worksheet.addRow(headerNameList);
      // worksheet.addRow(headerNameList);
      const HeaderRowOutlet = worksheet.addRow(headerNameList);
      HeaderRowOutlet.eachCell((cell, index) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '0072C5' },
          bgColor: { argb: 'FFFFFFFF' },
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cell.font = { size: 12, bold: true, color: { argb: 'ffffff' } };
        cell.alignment = { vertical: 'bottom', horizontal: 'center' };
        worksheet.getColumn(index).width =
          headerNameList[index - 1].length < 20
            ? 20
            : headerNameList.length[index - 1];
      });
      testcaseData.forEach((item: any) => {
        let rowList = [
          item?.category,
          item?.intel_average_value,
          item?.ODC_average_value,
          /* item?.intel_average_percentage,
          item?.ODC_average_percentage, */
        ];
        const row = worksheet.addRow(rowList);
      }),
        workbook.xlsx.writeBuffer().then((data: any) => {
          let blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          FileSaver(blob, fileName);
        });
    }
  }
  downloadForecastTableSummaryList(jsonData: any[], fileName: string) {
    debugger;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');
    let testcaseData = jsonData;

    let headerNameList = [
      'Category',
      'Bench_Demand_Intel',
      'Rack_Demand_Intel',
      'Bench_Demand_ODC',
      'Rack_Demand_ODC',
      'Total',
      'Intel_percentage',
      'ODC_percentage',
      'Total_Bench_Intel',
      'Total_Rack_Intel',
    ];
    // let headerRow = worksheet.addRow(headerNameList);
    const HeaderRowOutlet = worksheet.addRow(headerNameList);
    HeaderRowOutlet.eachCell((cell, index) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0072C5' },
        bgColor: { argb: 'FFFFFFFF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.font = { size: 12, bold: true, color: { argb: 'ffffff' } };
      cell.alignment = { vertical: 'bottom', horizontal: 'center' };
      worksheet.getColumn(index).width =
        headerNameList[index - 1].length < 20
          ? 20
          : headerNameList.length[index - 1];
    });
    testcaseData.forEach((item: any) => {
      let rowList = [
        item?.category,
        item?.Bench_Demand_Intel,
        item?.Rack_Demand_Intel,
        item?.Bench_Demand_ODC,
        item?.Rack_Demand_ODC,
        item?.Total,
        item?.Intel_percentage,
        item?.ODC_percentage,
        item?.Total_Bench_Intel,
        item?.Total_Rack_Intel,
      ];
      const row = worksheet.addRow(rowList);
    }),
      workbook.xlsx.writeBuffer().then((data: any) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver(blob, fileName);
      });
  }
  downloadForecastSummaryComparison(
    jsonData: any[],
    fileName: string,
    fromYear,
    toYear
  ) {
    debugger;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');
    let testcaseData = jsonData;

    let headerNameList = [
      'Category',
      fromYear + ' intel',
      toYear + ' intel',
      fromYear + ' ODC',
      toYear + ' ODC',
      fromYear + ' Ramp',
      toYear + ' Ramp',
    ];
    // let headerRow = worksheet.addRow(headerNameList);
    const HeaderRowOutlet = worksheet.addRow(headerNameList);
    HeaderRowOutlet.eachCell((cell, index) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0072C5' },
        bgColor: { argb: 'FFFFFFFF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.font = { size: 12, bold: true, color: { argb: 'ffffff' } };
      cell.alignment = { vertical: 'bottom', horizontal: 'center' };
      worksheet.getColumn(index).width =
        headerNameList[index - 1].length < 20
          ? 20
          : headerNameList.length[index - 1];
    });
    testcaseData.forEach((item: any) => {
      let rowList = [
        item?.category,
        item?.[fromYear + '_intel'],
        item?.[toYear + '_intel'],
        item?.[fromYear + '_ODC'],
        item?.[toYear + '_ODC'],
        item?.[fromYear + '_Ramp'],
        item?.[toYear + '_Ramp'],
      ];
      const row = worksheet.addRow(rowList);
    }),
      workbook.xlsx.writeBuffer().then((data: any) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver(blob, fileName);
      });
  }
  downloadForecastSummaryComparisonAllYear(
    jsonData: any[],
    fileName: string,
    header: any
  ) {
    debugger;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');
    let testcaseData = jsonData;

    let headerNameList = header;
    // let headerRow = worksheet.addRow(headerNameList);
    const HeaderRowOutlet = worksheet.addRow(headerNameList);
    HeaderRowOutlet.eachCell((cell, index) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0072C5' },
        bgColor: { argb: 'FFFFFFFF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.font = { size: 12, bold: true, color: { argb: 'ffffff' } };
      cell.alignment = { vertical: 'bottom', horizontal: 'center' };
      worksheet.getColumn(index).width =
        headerNameList[index - 1].length < 20
          ? 20
          : headerNameList.length[index - 1];
    });
    testcaseData.forEach((item: any) => {
      let rowList = [];
      header.forEach((element) => {
        if (element == 'Category') {
          rowList.push(item['category']);
        } else {
          rowList.push(item[element]);
        }
      });
      const row = worksheet.addRow(rowList);
    }),
      workbook.xlsx.writeBuffer().then((data: any) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver(blob, fileName);
      });
  }
  downloadForecastSummaryYearComparison(jsonData: any[], fileName: string) {
    debugger;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');
    let testcaseData = jsonData;

    let headerNameList = ['Category', 'Value'];
    // let headerRow = worksheet.addRow(headerNameList);
    const HeaderRowOutlet = worksheet.addRow(headerNameList);
    HeaderRowOutlet.eachCell((cell, index) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0072C5' },
        bgColor: { argb: 'FFFFFFFF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.font = { size: 12, bold: true, color: { argb: 'ffffff' } };
      cell.alignment = { vertical: 'bottom', horizontal: 'center' };
      worksheet.getColumn(index).width =
        headerNameList[index - 1].length < 20
          ? 20
          : headerNameList.length[index - 1];
    });
    testcaseData.forEach((item: any) => {
      let rowList = [item?.category, item?.value];
      const row = worksheet.addRow(rowList);
    }),
      workbook.xlsx.writeBuffer().then((data: any) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver(blob, fileName);
      });
  }
  downloadUtilizationSummary(jsonData: any[], fileName: string) {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');
    let testcaseData = jsonData;

    let headerNameList = [
      'Category',
      'Planned',
      'Actual',
      'Actual Utilization %',
      'Utilization %',
    ];
    // let headerRow = worksheet.addRow(headerNameList);
    const HeaderRowOutlet = worksheet.addRow(headerNameList);
    HeaderRowOutlet.eachCell((cell, index) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0072C5' },
        bgColor: { argb: 'FFFFFFFF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.font = { size: 12, bold: true, color: { argb: 'ffffff' } };
      cell.alignment = { vertical: 'bottom', horizontal: 'center' };
      worksheet.getColumn(index).width =
        headerNameList[index - 1].length < 20
          ? 20
          : headerNameList.length[index - 1];
    });
    testcaseData.forEach((item: any) => {
      let rowList = [
        item.category,
        item.Planned,
        item.Actual,
        item.Actual_Utilization_Percentage,
        item.Utilization_Percentage,
      ];
      const row = worksheet.addRow(rowList);
    }),
      workbook.xlsx.writeBuffer().then((data: any) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver(blob, fileName);
      });
  }
  downloadUtlizationSummaryWW(jsonData: any[], fileName: string) {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');
    let testcaseData = jsonData;

    let headerNameList = ['Category', 'Planned', 'Actual', 'Utilization %'];
    // let headerRow = worksheet.addRow(headerNameList);
    const HeaderRowOutlet = worksheet.addRow(headerNameList);
    HeaderRowOutlet.eachCell((cell, index) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0072C5' },
        bgColor: { argb: 'FFFFFFFF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.font = { size: 12, bold: true, color: { argb: 'ffffff' } };
      cell.alignment = { vertical: 'bottom', horizontal: 'center' };
      worksheet.getColumn(index).width =
        headerNameList[index - 1].length < 20
          ? 20
          : headerNameList.length[index - 1];
    });
    testcaseData.forEach((item: any) => {
      let rowList = [
        item.category,
        item.Planned,
        item.Actual,
        item.Utilization,
      ];
      const row = worksheet.addRow(rowList);
    }),
      workbook.xlsx.writeBuffer().then((data: any) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver(blob, fileName);
      });
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
