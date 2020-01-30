import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Pipe({
  name: 'subjectReference'
})
export class SubjectReferencePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  private readonly referenceRegEx = /\[id\d+\|(.+?)]/g;

  transform(value: string, classes: string = 'mat-body-strong'): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value.replace(this.referenceRegEx, this.spanWrapper(classes)));
  }

  private spanWrapper(classes: string): (substring: string, ...args: any[]) => string {
    return (_, name) => `<span class="${classes}">${name}</span>`
  }

}
