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
                val.LabDetails === null ? val.LabDetails
                    : val.LabDetails.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                || (val.program === null ? val.program
                    : val.program.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.SKU === null ? val.SKU
                    : val.SKU.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.vendor === null ? val.vendor
                    : val.vendor.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.AllocateTo === null ? val.AllocateTo
                    : val.AllocateTo.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.FromWW === null ? val.FromWW
                    : val.FromWW.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.ToWW === null ? val.ToWW
                    : val.ToWW.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.Bench === null ? val.Bench
                    : val.Bench.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()));
                     
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
                val.LabDetails === null ? val.LabDetails
                    : val.LabDetails.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
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
                val.program === null ? val.program
                    : val.program.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
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
                val.SKU === null ? val.SKU
                    : val.SKU.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
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
                val.vendor === null ? val.vendor
                    : val.vendor.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
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
                val.AllocateTo === null ? val.AllocateTo
                    : val.AllocateTo.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
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
                val.Bench === null ? val.Bench
                    : val.Bench.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
        });
    }
}

