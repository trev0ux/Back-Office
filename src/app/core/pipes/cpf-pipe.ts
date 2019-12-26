import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'cpfCustom' })
export class CPFPipe implements PipeTransform {

    transform(val: string): string {
        let contentFormmated = val;
        if (val.length === 11) {
            contentFormmated = val.substr(0, 3) + '.' +
                val.substr(3, 3) + '.' +
                val.substr(6, 3) + '-' +
                val.substr(9, 2);
        }
        return contentFormmated;
    }

}
