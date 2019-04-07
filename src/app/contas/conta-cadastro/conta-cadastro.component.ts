import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Conta, Meses } from '../../blog-model/blog-enum/tipoConta';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import {
  ContaModel, 
  Contas, 
  TipoConta,
  MesSalarioModel,
  MesModel
 } from '../../blog-model/schema';
import { ContaService } from '../../services/conta.service';
import { MesSalarioService } from '../../services/mes-salario.service';
import { MesService } from '../../services/mes.service';
import { Observable } from 'rxjs/Observable';
import { TipoContaService } from '../../services/tipo-conta.service';

@Component({
  selector: 'app-conta-cadastro',
  templateUrl: './conta-cadastro.component.html',
  styleUrls: ['./conta-cadastro.component.scss']
})
export class ContaCadastroComponent implements OnInit {

  assetContaForm: FormGroup;
  contas: Contas[] = [];
  contasModel: ContaModel[] = [];
  /* meses: string[] = Object.keys(Meses); */
  meses: MesModel[] = [];
  tipoContas: TipoConta[] = [];
  canAdd = false;

  constructor(
    private formBuilder: FormBuilder,
    dateAdapter: DateAdapter<NativeDateAdapter>,
    private contaService: ContaService,
    private mesSalarioService: MesSalarioService,
    private mesService: MesService,
    private tipoConta: TipoContaService
  ) {
    dateAdapter.setLocale('pt-BR');
  }

  ngOnInit() {

    this.mesService.getMeses().subscribe(result => this.meses = result);
    this.tipoConta.getTipoContas().subscribe(result => this.tipoContas = result);

    this.assetContaForm = this.formBuilder.group({
      mes: ['', Validators.required],
      salario: ['', Validators.required],
      conta: ['', Validators.required],
      valorConta: ['', Validators.required],
      dataVencimento: ['', Validators.required],
      dataPagamento: ['', Validators.required],
      comentario: ['']
    });
  }

  getFormatDate(): any {
    const formValues = this.assetContaForm.value;
    const dataVencimento = formValues.dataVencimento;
    if (dataVencimento != null) {
      return dataVencimento
    } else {
      return null;
    }
  }

  verifyDadosContas(event: KeyboardEvent) {
    const formValues = this.assetContaForm.value;

    const mesSalario = formValues.mes;
    const tipoConta = formValues.conta;
    const valorConta = formValues.valorConta;
    const dataVencimento = formValues.dataVencimento;
    const dataPagamento = formValues.dataPagamento;

    this.mesSalarioService.getMesSalario(parseInt(mesSalario)).subscribe(response => {

      let resp: MesSalarioModel = <MesSalarioModel>response;

      if (resp != null) {
        this.canAdd = false;
        alert('Mes já cadastro');
      }
    });

    if (tipoConta && valorConta && dataVencimento && dataPagamento) {
      this.canAdd = true;
    } else {
      this.canAdd = false;
    }
  }

  salvarContas() {
    const formValues = this.assetContaForm.value;

    const mes = {
      codigo: formValues.mes
    } as MesModel;

    const mesSalario = {
      mes: mes,
      valorSalario: parseFloat(this.inputNumberNormalize(formValues.salario)),
    } as MesSalarioModel;

    const TConta = {
      codigo: formValues.conta
    } as TipoConta;

    this.mesSalarioService.salvarMesSalario(mesSalario).subscribe(response => {

      let resp: MesSalarioModel = <MesSalarioModel>response;


      this.contas.forEach((conta: Contas) => {

        const contaModel = {
          tipoConta: TConta,
          valorConta: parseFloat(this.inputNumberNormalize(conta.valorConta)),
          dataVencimento: new Date(conta.dataVencimento),
          dataPagamento: new Date(conta.dataPagamento),
          dsComentario: conta.dsComentario,
          mesSalario: resp
        } as ContaModel;
        
        this.contasModel.push(contaModel);
      });


      this.contasModel.forEach((conta: ContaModel) => {
        this.contaService.salvarConta(conta).subscribe(result => {
          this.resetTela();
          this.canAdd = false;
        }, error => console.error(error));
      });
    });
  }

  addContas() {
    const formValues = this.assetContaForm.value;
    const conta = {
      tipoConta: formValues.conta,
      valorConta: formValues.valorConta,
      dataVencimento: formValues.dataVencimento,
      dataPagamento: formValues.dataPagamento,
      dsComentario: formValues.comentario
    } as Contas;

    this.contas.push(conta);
    this.resetDadosContas();
    this.canAdd = false;
  }

  deleteContas(contaId: string) {
    const conta = this.contas.find(item => item.id === contaId) || {} as Contas;
    const itemIndex = this.contas.indexOf(conta);
    this.contas.splice(itemIndex, 1);
  }

  resetDadosContas() {
    this.assetContaForm.controls.conta.reset();
    this.assetContaForm.controls.valorConta.reset();
    this.assetContaForm.controls.dataVencimento.reset();
    this.assetContaForm.controls.dataPagamento.reset();
    this.assetContaForm.controls.comentario.reset();
  }

  resetTela() {
    this.assetContaForm.controls.mes.reset();
    this.assetContaForm.controls.salario.reset();
    this.contas = [];
  }

  inputKeyPressAsBrlCurrency(event: KeyboardEvent) {
    const patternBeforeComma = /[0-9,]/;
    const patternAfterComma = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    const eventTarget = <HTMLInputElement>event.target;
    const fieldClean = this.inputNumberNormalize(eventTarget.value).replace(/\./g, '');

    switch (true) {
      case (eventTarget.value.indexOf(',') !== -1):
        eventTarget.value = eventTarget.value.replace('.,', ',');

        if (!patternAfterComma.test(inputChar)) {
          // caractere não permitido
          event.preventDefault();
        }

        break;

      case (event.key === ','):
        break;

      default:
        if (!patternBeforeComma.test(inputChar)) {
          // caractere não permitido
          event.preventDefault();
          return;
        }

        if (eventTarget.value.indexOf('R$') === -1) {
          eventTarget.value = `R$ ${eventTarget.value}`;
        }

        eventTarget.value = eventTarget.value.replace(/\./g, '');

        switch (true) {
          case (fieldClean.length + 1 > 4 && (fieldClean.length + 1) % 3 === 2):
            eventTarget.value = eventTarget.value.replace(/(R\$ \d{2})([0-9\.]*)/, '$1.$2');
            eventTarget.value = eventTarget.value = eventTarget.value.replace(/(\d{3})/g, '$1.');

            break;

          case (fieldClean.length + 1 > 3 && (fieldClean.length + 1) % 3 === 1):
            eventTarget.value = eventTarget.value.replace(/(R\$ \d{1})([0-9\.]*)/, '$1.$2');
            eventTarget.value = eventTarget.value = eventTarget.value.replace(/(\d{3})/g, '$1.');

            break;

          default:
            eventTarget.value = eventTarget.value = eventTarget.value.replace(/(\d{3})/g, '$1.');
        }

        break;
    }
  }

  inputNumberNormalize(value: string): string {
    return value
      .replace(/^R\$ */, '')
      .replace(/\./g, '')
      .replace(/%/g, '')
      .replace(',', '.');
  }
}