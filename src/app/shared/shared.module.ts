import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common/src/common_module';


@NgModule({
    exports: [
        CommonModule,
        DropdownDirective
    ],
    declarations: [
        DropdownDirective
    ]
})
export class SharedModule { }
