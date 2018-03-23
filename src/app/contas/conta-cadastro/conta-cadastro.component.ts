import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Conta, Meses } from '../../blog-model/blog-enum/tipoConta';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { Observer } from 'rxjs';
import { Contas } from '../../blog-model/schema';

@Component({
  selector: 'app-conta-cadastro',
  templateUrl: './conta-cadastro.component.html',
  styleUrls: ['./conta-cadastro.component.scss']
})
export class ContaCadastroComponent implements OnInit {

  assetContaForm: FormGroup;
  contas: Contas[] = [];
  meses: string[] = Object.keys(Meses);
  tipoConta = [
    { id: '1', name: Conta.ALUGUEL },
    { id: '2', name: Conta.AGUA },
    { id: '3', name: Conta.LUZ },
    { id: '4', name: Conta.GAS },
    { id: '5', name: Conta.COMBO },
    { id: '6', name: Conta.CC },
    { id: '7', name: Conta.CELULAR },
    { id: '8', name: 'OUTRO' }
  ];

  constructor(private formBuilder: FormBuilder, dateAdapter: DateAdapter<NativeDateAdapter>) {
    dateAdapter.setLocale('pt-BR');
  }

  ngOnInit() {
    this.assetContaForm = this.formBuilder.group({
      mes: [''],
      salario: [''],
      conta: [''],
      valorConta: [''],
      dataVencimento: [''],
      dataPagamento: [''],
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


  deleteContas(contaId: string) {
    const conta = this.contas.find(item => item.id === contaId) || {} as Contas;
    const itemIndex = this.contas.indexOf(conta);
    this.contas.splice(itemIndex, 1);
  }
}