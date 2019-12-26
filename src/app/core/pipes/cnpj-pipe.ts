import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'cnpjCustom' })
export class CNPJPipe implements PipeTransform {

    transform(val: string): string {
        let contentFormmated = val;
        if (val.length === 14) {
            contentFormmated = val.substr(0, 2) + '.' +
                val.substr(2, 3) + '.' +
                val.substr(5, 3) + '/' +
                val.substr(8, 4) + '-' +
                val.substr(12, 2);
        }
        return contentFormmated;
    }

}
