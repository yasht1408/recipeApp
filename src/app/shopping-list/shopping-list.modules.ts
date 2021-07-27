import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModules } from "../shared/shared.module";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

const shoppingListRoutes = [
    { path: '', component: ShoppingListComponent }
]

@NgModule({
    declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
    ],
    imports: [SharedModules,FormsModule,ReactiveFormsModule,CommonModule, RouterModule.forChild(shoppingListRoutes)],
    exports:[]
})
export class ShoppingListModule {}