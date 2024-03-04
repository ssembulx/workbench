import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'searchFilter',
  pure: false,
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return (
        (val.Location__Name === null
          ? val.Location__Name
          : val.Location__Name.toString()
              .trim()
              .toLowerCase()
              .includes(args.toString().trim().toLowerCase())) ||
        (val.Team === null
          ? val.Team
          : val.Team.toString()
              .trim()
              .toLowerCase()
              .includes(args.toString().trim().toLowerCase())) ||
        (val.Program === null
          ? val.Program
          : val.Program.toString()
              .trim()
              .toLowerCase()
              .includes(args.toString().trim().toLowerCase())) ||
        (val.Sku === null
          ? val.Sku
          : val.Sku.toString()
              .trim()
              .toLowerCase()
              .includes(args.toString().trim().toLowerCase())) ||
        (val.Vendor === null
          ? val.Vendor
          : val.Vendor.toString()
              .trim()
              .toLowerCase()
              .includes(args.toString().trim().toLowerCase())) ||
        (val.AllocatedTo[0].Name === null
          ? val.AllocatedTo[0].Name
          : val.AllocatedTo[0].Name.toString()
              .trim()
              .toLowerCase()
              .includes(args.toString().trim().toLowerCase())) ||
        (val.FromWW === null
          ? val.FromWW
          : val.FromWW.toString()
              .trim()
              .toLowerCase()
              .includes(args.toString().trim().toLowerCase())) ||
        (val.ToWW === null
          ? val.ToWW
          : val.ToWW.toString()
              .trim()
              .toLowerCase()
              .includes(args.toString().trim().toLowerCase())) ||
        (val.BenchData === null
          ? val.BenchData
          : val.BenchData.toString()
              .trim()
              .toLowerCase()
              .includes(args.toString().trim().toLowerCase())) ||
        (val.Duration === null
          ? val.Duration
          : val.Duration.toString()
              .trim()
              .toLowerCase()
              .includes(args.toString().trim().toLowerCase())) ||
        (val.Remarks === null
          ? val.Remarks
          : val.Remarks.toString()
              .trim()
              .toLowerCase()
              .includes(args.toString().trim().toLowerCase())) ||
        (val.approvedBy === null
          ? val.approvedBy
          : val.approvedBy
              .toString()
              .trim()
              .toLowerCase()
              .includes(args.toString().trim().toLowerCase()))
      );
    });
  }
}

@Pipe({
  name: 'searchFilterLocation',
  pure: false,
})
export class SearchLab implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.Location__Name === null
        ? val.Location__Name
        : val.Location__Name.toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}

@Pipe({
  name: 'searchFilterAllocationDate',
  pure: false,
})
export class SearchAllocationDate implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.AllocatedDate === null
        ? val.AllocatedDate
        : val.AllocatedDate.toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}

@Pipe({
  name: 'searchFilterTeam',
  pure: false,
})
export class SearchTeam implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.Team === null
        ? val.Team
        : val.Team.toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}

@Pipe({
  name: 'searchFilterProgram',
  pure: false,
})
export class SearchProgram implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.Program === null
        ? val.Program
        : val.Program.toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}
/* search program add forecast data */
@Pipe({
  name: 'searchFilterProgramAddForecast',
  pure: false,
})
export class SearchProgramAddForecast implements PipeTransform {
  transform(value: any, searchTerm?: any): any {
    if (!searchTerm) {
      return value;
    }

    // Use Array.prototype.filter to filter the nested array
    return value.filter(item => {
      return this.nestedSearchRecursive(item, searchTerm, 'value');
    });
  }
  nestedSearchRecursive(item: any, searchTerm: string, property: string): boolean {
    if (item[property] && item[property].toString().toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }

    if (Array.isArray(item)) {
      for (const child of item) {
        if(child?.properties == 'Program'){
          if (this.nestedSearchRecursive(child, searchTerm, 'value')) {
            return true;
          }
        }
      }
    }

    return false;
  }
}

/* search SKU add forecast data */
@Pipe({
  name: 'searchFilterSKUAddForecast',
  pure: false,
})
export class SearchSKUAddForecast implements PipeTransform {
  transform(value: any, searchTerm?: any): any {
    if (!searchTerm) {
      return value;
    }

    // Use Array.prototype.filter to filter the nested array
    return value.filter(item => {
      return this.nestedSearchRecursive(item, searchTerm, 'value');
    });
  }
  nestedSearchRecursive(item: any, searchTerm: string, property: string): boolean {
    if (item[property] && item[property].toString().toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }

    if (Array.isArray(item)) {
      for (const child of item) {
        if(child?.properties == 'Sku'){
          if (this.nestedSearchRecursive(child, searchTerm, 'value')) {
            return true;
          }
        } 
      }
    }

    return false;
  }
}
/* search Team add forecast data */
@Pipe({
  name: 'searchFilterTeamAddForecast',
  pure: false,
})
export class SearchTeamAddForecast implements PipeTransform {
  transform(value: any, searchTerm?: any): any {
    if (!searchTerm) {
      return value;
    }

    // Use Array.prototype.filter to filter the nested array
    return value.filter(item => {
      return this.nestedSearchRecursive(item, searchTerm, 'value');
    });
  }
  nestedSearchRecursive(item: any, searchTerm: string, property: string): boolean {
    if (item[property] && item[property].toString().toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }

    if (Array.isArray(item)) {
      for (const child of item) {
        if(child?.properties == 'Team'){
          if (this.nestedSearchRecursive(child, searchTerm, 'value')) {
            return true;
          }
        } 
      }
    }

    return false;
  }
}

/* search Team add forecast data */
@Pipe({
  name: 'searchFilterVendorAddForecast',
  pure: false,
})
export class SearchVendorAddForecast implements PipeTransform {
  transform(value: any, searchTerm?: any): any {
    if (!searchTerm) {
      return value;
    }

    // Use Array.prototype.filter to filter the nested array
    return value.filter(item => {
      return this.nestedSearchRecursive(item, searchTerm, 'value');
    });
  }
  nestedSearchRecursive(item: any, searchTerm: string, property: string): boolean {
    if (item[property] && item[property].toString().toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }

    if (Array.isArray(item)) {
      for (const child of item) {
        if(child?.properties == 'Vendor'){
          if (this.nestedSearchRecursive(child, searchTerm, 'value')) {
            return true;
          }
        } 
      }
    }

    return false;
  }
}


@Pipe({
  name: 'searchFilterSku',
  pure: false,
})
export class SearchSku implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.Sku === null
        ? val.Sku
        : val.Sku.toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}

@Pipe({
  name: 'searchFilterVendor',
  pure: false,
})
export class SearchVendor implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.Vendor === null
        ? val.Vendor
        : val.Vendor.toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}

@Pipe({
  name: 'searchFilterAllocated',
  pure: false,
})
export class SearchAllocated implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.AllocatedTo[0].Name === null
        ? val.AllocatedTo[0].Name
        : val.AllocatedTo[0].Name.toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}

@Pipe({
  name: 'searchFilterFromWW',
  pure: false,
})
export class SearchFromWW implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.FromWW === null
        ? val.FromWW
        : val.FromWW.toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}

@Pipe({
  name: 'searchFilterToWW',
  pure: false,
})
export class SearchToWW implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.ToWW === null
        ? val.ToWW
        : val.ToWW.toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}

@Pipe({
  name: 'searchFilterBench',
  pure: false,
})
export class SearchBench implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.BenchData === null
        ? val.BenchData
        : val.BenchData.toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}

@Pipe({
  name: 'searchFilterDuration',
  pure: false,
})
export class SearchDuration implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.Duration === null
        ? val.Duration
        : val.Duration.toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}
@Pipe({
  name: 'searchFilterRemarks',
  pure: false,
})
export class SearchRemarks implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.Remarks === null
        ? val.Remarks
        : val.Remarks.toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}
@Pipe({
  name: 'searchFilterApprovedBy',
  pure: false,
})
export class SearchApprovedBy implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.approvedBy === null
        ? val.approvedBy
        : val.approvedBy
            .toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}

@Pipe({
  name: 'searchFilterRequestedBy',
  pure: false,
})
export class SearchRequestedBy implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.RequestedBy === null
        ? val.RequestedBy
        : val.RequestedBy[0].Name.toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}

@Pipe({
  name: 'searchFilterDetails',
  pure: false,
})
export class SearchBenchdetails implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.BenchData === null
        ? val.BenchData
        : val.BenchData.toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}

@Pipe({
  name: 'searchFilterFeedback',
  pure: false,
})
export class SearchPipeFeedback implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return (
        (val.suggestion_by[0].WWID === null
          ? val.suggestion_by[0].WWID
          : val.suggestion_by[0].WWID.toString()
              .trim()
              .toLowerCase()
              .includes(args.toString().trim().toLowerCase())) ||
        (val.suggestion_by[0].Name === null
          ? val.suggestion_by[0].Name
          : val.suggestion_by[0].Name.toString()
              .trim()
              .toLowerCase()
              .includes(args.toString().trim().toLowerCase())) ||
        (val.suggestion_by[0].Email === null
          ? val.suggestion_by[0].Email
          : val.suggestion_by[0].Email.toString()
              .trim()
              .toLowerCase()
              .includes(args.toString().trim().toLowerCase())) ||
        (val.created_date === null
          ? val.created_date
          : val.created_date
              .toString()
              .trim()
              .toLowerCase()
              .includes(args.toString().trim().toLowerCase()))
      );
    });
  }
}

@Pipe({
  name: 'nonsivSearchFilterLab',
  pure: false,
})
export class nonsivSearchLab implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.location === null
        ? val.location
        : val.location
            .toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}

@Pipe({
  name: 'nonsivSearchFilterLabDetails',
  pure: false,
})
export class nonsivSearchLabDetails implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.lab === null
        ? val.lab
        : val.lab
            .toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}

@Pipe({
  name: 'nonsivSearchFilterLabDetailsNo',
  pure: false,
})
export class nonsivSearchLabDetailsNo implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      return val.value === null
        ? val.value
        : val.value
            .toString()
            .trim()
            .toLowerCase()
            .includes(args.toString().trim().toLowerCase());
    });
  }
}
