import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent, MatDialog } from '@angular/material';
import { Pessoa } from '../../../blog-model/pessoa-model/pessoa';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EMAIL_SISTEMA, EMAIL_SISTEMA_TELA } from '../../../blog-constants/blog.constants';
import { PessoaService } from '../../../services/pessoa.service';
import { Mensagem, Destinatario } from '../../../blog-model/mensagem-model/mensagem-model';
import { Response } from '../../../services/response';


import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { DialogAlertData, DialogMessageComponent } from '../dialog-message/dialog-message.component';

@Component({
  selector: 'app-dialog-blog-email',
  templateUrl: './dialog-blog-email.component.html',
  styleUrls: ['./dialog-blog-email.component.scss']
})
export class DialogBlogEmailComponent implements OnInit {

  private pessoas: Pessoa[] = [];
  emailForm: FormGroup;
  @Output() onCloseDialog = new EventEmitter();
  destinatarios: Destinatario[] = [];
  isSending: boolean = false;


  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  constructor(
    public dialogRef: MatDialogRef<DialogBlogEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pessoaService: PessoaService,
    private formBuilder: FormBuilder,
    private dialogService: MatDialog
  ) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      emailRemetente: ['', Validators.email],
      emailMensagem: ['']
    });

    this.emailForm.controls['emailRemetente'].setValue(EMAIL_SISTEMA_TELA);
    this.getlistDestinatario();
  }


  getlistDestinatario() {
    this.data.pessoaSelecionada.forEach((pessoa: Pessoa) => {
      const destinatario = {
        nome: pessoa.nome,
        email: pessoa.email,
      } as Destinatario;
      this.destinatarios.push(destinatario);
    });
  }

  sendEmail() {

    this.isSending = true;
    const formValue = this.emailForm.value;
    const type: string = this.data.type;

    const sendMessage: Mensagem = {
      remetente: EMAIL_SISTEMA,
      destinatarios: this.destinatarios,
      assunto: 'Portal SERV: Registro de Clientes em anexo',
      texto: formValue.emailMensagem,
      html: false,
      anexo: true,
    }
    this.pessoaService.sendEmail(type, sendMessage).subscribe(response => {
      let res: Response = <Response>response;
      if (res.codigo == 1) {
        this.onCloseDialog.emit();
        const alertData: DialogAlertData = {
          type: 'success',
          title: res.mensagem,
        };
        this.dialogService.open(DialogMessageComponent, { data: alertData });
      }
      else {
        const alertData: DialogAlertData = {
          type: 'error',
          text: 'Erro ao enviar o e-mail',
          title: res.mensagem,
        };

        this.dialogService.open(DialogMessageComponent, { data: alertData });
      }
    });
  }

  cancelEmail() {
    this.onCloseDialog.emit();
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    const destinatario = {
      nome: 'AddUsuario',
      email: value,
    } as Destinatario;

    // Add our person
    if ((value || '').trim()) {
      this.destinatarios.push(destinatario);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(destinatario: any): void {
    let index = this.destinatarios.indexOf(destinatario);

    if (index >= 0) {
      this.destinatarios.splice(index, 1);
    }
  }

}
