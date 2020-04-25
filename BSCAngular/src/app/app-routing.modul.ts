import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { TopManuBarComponent } from './topManuBar/topManuBar.component';
import { SignInComponent } from './sing-in/sing-in.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { AutocompleteComponent } from './topManuBar/components/autocomplete/autocomplete.component';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: SignInComponent},
    {path: 'main', component: TopManuBarComponent},
    {path: 'nameedit', component: NameEditorComponent},
    {path: 'auto', component:     AutocompleteComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModul { }
export const RoutingComponent = []