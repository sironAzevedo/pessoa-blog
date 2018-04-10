import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Conta, Meses } from '../../blog-model/blog-enum/tipoConta';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { Observer } from 'rxjs';
import { Contas } from '../../blog-model/schema';
import { ContaService } from '../../services/conta.service';
import { MesSalarioService } from '../../services/mes-salario.service';
import { MesSalarioModel } from '../../blog-model/mes-salario-model/mes-salario';
import { MesModel } from '../../blog-model/mes-model/meses';
import { ContaModel } from '../../blog-model/conta-model/Conta';

@Component({
  selector: 'app-conta-cadastro',
  templateUrl: './conta-cadastro.component.html',
  styleUrls: ['./conta-cadastro.component.scss']
})
export class ContaCadastroComponent implements OnInit {

  assetContaForm: FormGroup;
  contas: Contas[] = [];
  contasModel: ContaModel[] = [];
  meses: string[] = Object.keys(Meses);
  canAdd = false;
  tiposConta = [
    { id: '1', name: Conta.ALUGUEL },
    { id: '2', name: Conta.AGUA },
    { id: '3', name: Conta.LUZ },
    { id: '4', name: Conta.GAS },
    { id: '5', name: Conta.COMBO },
    { id: '6', name: Conta.CC },
    { id: '7', name: Conta.CELULAR },
    { id: '8', name: 'OUTRO' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    dateAdapter: DateAdapter<NativeDateAdapter>,
    private contaService: ContaService,
    private mesSalarioService: MesSalarioService
  ) {
    dateAdapter.setLocale('pt-BR');
  }

  ngOnInit() {
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
    const tipoConta = formValues.conta;
    const valorConta = formValues.valorConta;
    const dataVencimento = formValues.dataVencimento;
    const dataPagamento = formValues.dataPagamento;

    if (tipoConta && valorConta && dataVencimento && dataPagamento) {
      this.canAdd = true;
    } else {
      this.canAdd = false;
    }
  }

  salvarContas() {
    const formValues = this.assetContaForm.value;
    //Lembrar de mudar a lista do combo do mes da tela para pegar do serviço e não do enum

    const mes = {
      codigo: formValues.mes,
      dsMes: '',
    } as MesModel;

    const mesSalario = {
      mes: mes,
      valorSalario: formValues.salario
    } as MesSalarioModel;

    this.mesSalarioService.salvarMesSalario(mesSalario).subscribe(response => {

      let resp: MesSalarioModel = <MesSalarioModel>response;


      this.contas.forEach((conta: Contas) => {

        const contaModel = {
          tipoConta: conta.tipoConta,
          valorConta: parseInt(conta.valorConta),
          dataVencimento: new Date(conta.dataVencimento),
          dataPagamento: new Date(conta.dataPagamento),
          dsComentario: conta.dsComentario,
          mesSalario: resp
        } as ContaModel;
        this.contasModel.push(contaModel);
      });
    });

    this.contasModel.forEach((conta: ContaModel) => {
      this.contaService.salvarConta(conta).subscribe(result => {
        /* this.gotoList(); */
      }, error => console.error(error));
    });
  }

  addContas() {
    const formValues = this.assetContaForm.value;
    const conta = {
      tipoConta: formValues.conta,
      valorConta: formValues.valorConta,
      dataVencimento: formValues.dataVencimento,
      dataPagamento: formValues.dataPagamento
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