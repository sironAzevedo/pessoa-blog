import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../blog-model/pessoa-model/pessoa';
import { Response } from '../../services/response';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToasterService, ToasterConfig, BodyOutputType } from 'angular2-toaster';


@Component({
    selector: 'app-cadastro-pessoa',
    templateUrl: './cadastro.component.html',
    styleUrls: ["./cadastro.component.scss"]
})
export class CadastroComponent implements OnInit, OnDestroy {

    private titulo: string;
    private pessoa: Pessoa = new Pessoa();
    assetCadastroForm: FormGroup;
    destroy$ = new Subject();
    isUpdate: boolean = false;
    isInputUpdate: boolean = false;
    addCan: boolean = false;
    isProcessing = false;
    descButton: string;

    constructor(
        private formBuilder: FormBuilder,
        private pessoaService: PessoaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toasterService: ToasterService) { }

    /*CARREGADO NA INICIALIZAÇÃO DO COMPONENTE */
    ngOnInit() {
        this.assetCadastroForm = this.formBuilder.group({
            pessoaCodigo: [''],
            pessoaNome: ['', Validators.compose([Validators.required])],
            emailCliente: ['', Validators.email],
            registroAtivo: ['', Validators.compose([Validators.required])],
        });

        this.activatedRoute.params.subscribe(parametro => {

            if (parametro.codigo == undefined) {

                this.isUpdate = false;
                this.descButton = 'Salvar';
                this.titulo = "Novo Cadastro de Pessoa";
            }
            else {

                this.isUpdate = true;
                this.isInputUpdate = true;
                this.descButton = 'Atualizar';
                this.titulo = "Editar Cadastro de Pessoa";
                this.pessoaService.getPessoa(Number(parametro.codigo))
                    .subscribe(res => {
                        this.assetCadastroForm.controls['pessoaCodigo'].setValue(res.codigo);
                        this.assetCadastroForm.controls['pessoaNome'].setValue(res.nome);
                        this.assetCadastroForm.controls['emailCliente'].setValue(res.email);
                        this.assetCadastroForm.controls['registroAtivo'].setValue(res.ativo);
                        return this.pessoa = res
                    });
            }

        });
    }

    /*FUNÇÃO PARA SALVAR UM NOVO REGISTRO OU ALTERAÇÃO EM UM REGISTRO EXISTENTE */
    salvar() {
        this.isProcessing = true;
        const formValue = this.assetCadastroForm.value;

        const documentInput: Pessoa = {
            codigo: formValue.pessoaCodigo,
            nome: formValue.pessoaNome,
            email: formValue.emailCliente,
            ativo: formValue.registroAtivo
        }
        if (formValue.pessoaCodigo == undefined || formValue.pessoaCodigo == "") {

            this.pessoaService.addPessoa(documentInput).subscribe(response => {

                //PEGA O RESPONSE DO RETORNO DO SERVIÇO
                let res: Response = <Response>response;

                /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
                E LIMPAR O FORMULÁRIO PARA INSERIR UM NOVO REGISTRO*/
                if (res.codigo == 1) {
                    alert(res.mensagem);
                    this.resetPessoa();
                }
                else {
                    /*
                    ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
                    NO SERVIDOR (CODIGO = 0)*/
                    alert(res.mensagem);
                }
            },
                (error) => {
                    /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
                      EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */
                    alert(error);
                });
        } else {
            /*AQUI VAMOS ATUALIZAR AS INFORMAÇÕES DE UM REGISTRO EXISTENTE */
            this.pessoaService.atualizarPessoa(documentInput).subscribe(response => {

                //PEGA O RESPONSE DO RETORNO DO SERVIÇO
                let res: Response = <Response>response;

                /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
                  E REDIRECIONAR O USUÁRIO PARA A PÁGINA DE CONSULTA*/

                if (res.codigo == 1) {
                    this.popToast(res.mensagem);
                }
                else {
                    /*ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
                    NO SERVIDOR (CODIGO = 0)*/
                    alert(res.mensagem);
                    this.toasterService.pop('error', 'Atualizar Cliente', res.mensagem);
                }
                this.router.navigate(['/consulta-pessoa']);
            },
                (erro) => {
                    /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
                     EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */
                    alert(erro);
                });
        }
    }

    resetPessoa() {
        this.assetCadastroForm.controls.pessoaCodigo.reset();
        this.assetCadastroForm.controls.pessoaNome.reset();
        this.assetCadastroForm.controls.emailCliente.reset();
        this.assetCadastroForm.controls.registroAtivo.reset();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete()
    }

    isViewUpdate(): boolean {
        return this.isUpdate;
    }

    public config: ToasterConfig =
        new ToasterConfig({
            showCloseButton: false,
            tapToDismiss: false,
            timeout: 2000,
            animation: 'fade'
        });

    popToast(msg: string) {
        this.toasterService.pop('success', msg).bodyOutputType = BodyOutputType.TrustedHtml;;
        /* this.toasterService.pop("info", "Args Title info", "Args Body <p/>  sdf")
            .bodyOutputType = BodyOutputType.TrustedHtml; */
    }
}