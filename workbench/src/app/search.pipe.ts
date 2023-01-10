import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'searchFilter',
    pure: false
})
export class SearchPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val: any) => {
            return (
                val.Location__Name === null ? val.Location__Name
                    : val.Location__Name.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                || (val.Program === null ? val.Program
                    : val.Program.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.Sku === null ? val.Sku
                    : val.Sku.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.Vendor === null ? val.Vendor
                    : val.Vendor.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.AllocatedTo === null ? val.AllocatedTo
                    : val.AllocatedTo.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.FromWW === null ? val.FromWW
                    : val.FromWW.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.ToWW === null ? val.ToWW
                    : val.ToWW.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.BenchData === null ? val.BenchData
                    : val.BenchData.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()));
                     
        });
    }
}

@Pipe({
    name: 'searchFilterLocation',
    pure: false
})
export class SearchLab implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val: any) => {
            return (
                val.Location__Name === null ? val.Location__Name
                    : val.Location__Name.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
        });
    }
}

@Pipe({
    name: 'searchFilterProgram',
    pure: false
})
export class SearchProgram implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val: any) => {
            return (
                val.Program === null ? val.Program
                    : val.Program.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
        });
    }
}

@Pipe({
    name: 'searchFilterSku',
    pure: false
})
export class SearchSku implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val: any) => {
            return (
                val.Sku === null ? val.Sku
                    : val.Sku.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
        });
    }
}

@Pipe({
    name: 'searchFilterVendor',
    pure: false
})
export class SearchVendor implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val: any) => {
            return (
                val.Vendor === null ? val.Vendor
                    : val.Vendor.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
        });
    }
}

@Pipe({
    name: 'searchFilterAllocated',
    pure: false
})
export class SearchAllocated implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val: any) => {
            return (
                val.AllocatedTo === null ? val.AllocatedTo
                    : val.AllocatedTo.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
        });
    }
}

@Pipe({
    name: 'searchFilterFromWW',
    pure: false
})
export class SearchFromWW implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val: any) => {
            return (
                val.FromWW === null ? val.FromWW
                    : val.FromWW.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
        });
    }
}

@Pipe({
    name: 'searchFilterToWW',
    pure: false
})
export class SearchToWW implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val: any) => {
            return (
                val.ToWW === null ? val.ToWW
                    : val.ToWW.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
        });
    }
}


@Pipe({
    name: 'searchFilterBench',
    pure: false
})
export class SearchBench implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val: any) => {
            return (
                val.BenchData === null ? val.BenchData
                    : val.BenchData.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
        });
    }
}

