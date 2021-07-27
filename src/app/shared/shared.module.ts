import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthComponent } from "../auth/auth.component";
import { HeaderComponent } from "../header/header.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
    declarations: [
    HeaderComponent,
    DropdownDirective,
    LoadingSpinnerComponent
    ],
    imports: [CommonModule],
    exports: [ HeaderComponent,
               DropdownDirective,
               LoadingSpinnerComponent,
               CommonModule
             ]
})
export class SharedModules {}