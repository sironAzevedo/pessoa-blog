import { Component, OnInit } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import {
  AfterViewInit,
  ComponentFactory,
  ComponentFactoryResolver,
  Inject,
  Input,
  Sanitizer,
  ViewChild,
  ViewContainerRef,
  ɵComponentFactory
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PvdHostDirective } from '../../directives/host.directive';
export const DIALOG_WARNING_CLASS = 'dialog--warning';
export const DIALOG_SUCCESS_CLASS = 'dialog--success';
export const DIALOG_HELP_CLASS = 'dialog--help';

export type DialogAlertType = 'default' | 'success' | 'error' | 'warning' | 'help';

export interface DialogAlertData {
  title?: string;
  text?: string;
  buttonText?: string;
  type?: DialogAlertType;
  showButton?: boolean;
  componentFactory?: ComponentFactory<any>;
  componentData?: any;
}

export interface DialogAlertError {
  title?: string;
  text?: string | null;
  buttonText?: string;
  type?: DialogAlertType;
  showButton?: boolean;

}

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss']
})
export class DialogMessageComponent implements OnInit, AfterViewInit {

  icon: string;
  title: SafeHtml;
  text: SafeHtml;
  type: DialogAlertType = 'default';
  buttonText = 'OK';
  showButton = true;
  componentFactory: ComponentFactory<any> | undefined;
  componentData: any | undefined;

  @ViewChild(PvdHostDirective) host: PvdHostDirective;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogAlertData,
    private sanitizer: DomSanitizer,
    private viewContanerRef: ViewContainerRef
  ) {
    if (data.title) {
      this.title = this.sanitizer.bypassSecurityTrustHtml(data.title);
    }
    if (data.text) {
      this.text = this.sanitizer.bypassSecurityTrustHtml(data.text);
    }

    if (data.buttonText) {
      this.buttonText = data.buttonText;
    }
    if (data.type) {
      this.type = data.type;
    }
    if (data.componentFactory) {
      this.componentFactory = data.componentFactory;
    }
    if (data.componentData) {
      this.componentData = data.componentData;
    }
    if (data.showButton !== undefined) {
      this.showButton = data.showButton;
    }
  }

  ngOnInit() {
    switch (this.type) {
      case 'success':
        this.icon = 'check_circle';
        break;
      case 'error':
        this.icon = 'error';
        break;
      case 'warning':
        this.icon = 'warning';
        break;
      case 'help':
        this.icon = 'help_outline';
        break;
    }
  }

  ngAfterViewInit() {
    if (this.componentFactory) {
        const viewContainerRef = this.host.viewContainerRef;

        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(this.componentFactory);

        if (this.componentData) {
            componentRef.instance.data = this.componentData;

            Object.keys(this.componentData).forEach(key => {
                componentRef.instance[key] = this.componentData[key];
            })
        }
    }
}

}
