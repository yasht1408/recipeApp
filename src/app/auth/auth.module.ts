import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModules } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

const authRoutes = [
    { path: '', component: AuthComponent}
]
@NgModule({
    declarations:[AuthComponent],
    imports: [FormsModule, RouterModule.forChild(authRoutes),SharedModules],
    exports: [RouterModule]
})
export class AuthModule {}