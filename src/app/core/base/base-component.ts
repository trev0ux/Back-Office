import { isNullOrUndefined } from 'util';

export abstract class BaseComponent {

  constructor() {
  }

  public cleanAllAttrs(filter: any) {
    Object.keys(filter).forEach(function (key) {
      if (filter[key] === undefined || filter[key] === null) {
        return;
      }
      if (typeof filter[key] === 'object' && filter[key].jsdate instanceof Date) {
        filter[key] = null;
      } else {
        filter[key] = undefined;
      }
    });
  }

  public cloneObject(filterClone: any): any {
    if (!isNullOrUndefined(filterClone)) {
      if (typeof filterClone === 'object') {
        const clone = new filterClone.constructor();
        Object.keys(filterClone).forEach((key) => {
          if (typeof filterClone === 'object') {
            clone[key] = this.cloneObject(filterClone[key]);
          } else {
            clone[key] = filterClone[key];
          }
        });
        return clone;
      }
    }
    return filterClone;
  }

  public isEmpty(value: any): boolean {
    return isNullOrUndefined(value);
  }

  protected isNullOrUndefinedOrEmpty(value: any): boolean {
    return isNullOrUndefined(value) || (value.toString() === '');
  }

  protected getMaskPhone(value?: string) {
    if (!this.isNullOrUndefinedOrEmpty(value) && value.length > 13) {
      // Mask de 9 digitos
      return '(00) 00000-0000';
    } else {
      // Mask de 8 digitos (default)
      return '(00) 0000-0000';
    }
  }

  protected discoveryContentType(name: string): string {
    let contentType = '';
    const ext = name.toUpperCase().split('.').pop() || name;
    if (ext === '.PNG') {
      contentType = 'image/png';
    } else if (ext === '.JPG') {
      contentType = 'image/jpg';
    } else if (ext === '.DOC' || ext === '.DOCX') {
      contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (ext === '.PDF') {
      contentType = 'application/pdf';
    } else if (ext === '.XLSX') {
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else if (ext === '.XLS') {
      contentType = 'application/excel';
    }
    return contentType;
  }

}
