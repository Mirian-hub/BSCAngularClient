import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppComponent } from './app.component';
import { BSCComponent } from './bsc/bsc.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { TopManuBarComponent } from './topManuBar/topManuBar.component';
import { TopFiltersComponent } from './topFilters/topFilters.component';
import { TopButtonsComponent } from './topButtons/topButtons.component';
import { LeftManyComponent } from './leftMany/leftMany.component';
import { ListTableComponent } from './listTable/listTable.component';
import { BottomBtnsComponent } from './bottomBtns/bottomBtns.component';
import { MatTabsModule, MatButtonModule } from '@angular/material';
import { TabContentComponent } from './topManuBar/tab-content.component';
import { ContentContainerDirective } from './topManuBar/content-container.directive';
import { Comp2Component } from './topManuBar/components/comp2.component';
import { AppRoutingModul, RoutingComponent } from './app-routing.modul';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sing-in/sing-in.component';
import { TableListViewComponent } from './topManuBar/components/tableListview/tableListview.component';
import { GrouplistComponent } from './topManuBar/components/grouplist/grouplist.component';
import { MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import {EditFormComponent} from './topManuBar/components/editForm/editForm.component';
import { IgxGridModule, IgxButtonGroupModule } from 'igniteui-angular';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import {SupplierComponent} from './topManuBar/components/supplier/supplier.component';
import {MatProgressSpinnerModule} from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';
import {AutocompleteSelectCellEditor} from 'ag-grid-autocomplete-editor';
import {AutocompleteComponent} from './topManuBar/components/autocomplete/autocomplete.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalModule} from 'ngx-bootstrap/modal';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TemplateRendererComponent} from './topManuBar/components/supplier/templateRendererComponent';
import { SupplierEditComponent } from './topManuBar/components/supplier/supplier-edit/supplier-edit.component';
import {MatTableModule} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    BSCComponent,
    TopManuBarComponent,
    TopFiltersComponent,
    TopButtonsComponent,
    LeftManyComponent,
    ListTableComponent,
    BottomBtnsComponent,
    TabContentComponent,
    ContentContainerDirective,
    Comp2Component,
    SignInComponent,
    TableListViewComponent,
    GrouplistComponent,
    EditFormComponent,
    NameEditorComponent,
    ProfileEditorComponent,
    SupplierComponent,
    AutocompleteComponent,
    TemplateRendererComponent,
    SupplierEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSliderModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatButtonModule,
    AppRoutingModul,
    RoutingComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatCheckboxModule,
    IgxGridModule,
    IgxButtonGroupModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    AgGridModule.withComponents([TemplateRendererComponent]),
    MatDialogModule,
    ModalModule.forRoot(),
    MatTooltipModule,
    MatAutocompleteModule
    ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    TableListViewComponent,
    GrouplistComponent,
    Comp2Component,
    EditFormComponent,
    SupplierComponent,
    TemplateRendererComponent,
    SupplierEditComponent
  ],
})
export class AppModule {
}
