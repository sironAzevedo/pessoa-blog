import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { TextLengthPipe } from './pipes/text-length.pipe';
import { MaterialModule } from '../+shered/angular.module';
import { PvdHostDirective } from './directives/host.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
import { DialogBlogEmailComponent } from './components/dialog-blog-email/dialog-blog-email.component';
import { DialogMessageComponent } from './components/dialog-message/dialog-message.component';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { SimpleListComponent } from './components/simple-list/simple-list.component';
import { CurrencyMaskDirective } from './directives/currency-mask.directive';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    exports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        TextLengthPipe,
        DateFormatPipe,
        MaterialModule,
        PvdHostDirective,
        AutofocusDirective,
        DialogBlogEmailComponent,
        DialogMessageComponent,
        ToasterModule,
        SimpleListComponent,
        CurrencyMaskDirective
    ],
    declarations: [
        TextLengthPipe,
        DateFormatPipe,
        PvdHostDirective,
        AutofocusDirective,
        DialogBlogEmailComponent,
        DialogMessageComponent,
        SimpleListComponent,
        CurrencyMaskDirective
    ],
    providers: [ToasterService],
    entryComponents: [DialogBlogEmailComponent, DialogMessageComponent, SimpleListComponent],
})
export class SharedModule { }