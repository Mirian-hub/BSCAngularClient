import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { TopManuBarComponent } from './topManuBar/topManuBar.component';
import { SignInComponent } from './sing-in/sing-in.component';
import { NameEditorComponent } from './name-editor/name-editor.component';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: SignInComponent},
    {path: 'main', component: TopManuBarComponent},
    {path: 'nameedit', component: NameEditorComponent},

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModul { }
export const RoutingComponent = []