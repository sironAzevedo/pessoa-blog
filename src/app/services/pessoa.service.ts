import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { Pessoa } from '../blog-model/pessoa-model/pessoa';
import { Mensagem } from '../blog-model/mensagem-model/mensagem-model';
import { ConfigService } from './config.service';
import { saveAs } from 'file-saver/FileSaver';
import { FILE_TYPE_PDF } from '../blog-constants/blog.constants';

@Injectable()
export class PessoaService {

    private baseUrlService: string = '';
    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http,
        private configService: ConfigService) {

        /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
        this.baseUrlService = configService.getUrlService() + '/pessoa/';

        /*ADICIONANDO O JSON NO HEADER */
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    /**CONSULTA TODAS AS PESSOAS CADASTRADAS */
    getPessoas() {
        return this.http.get(this.baseUrlService).map(res => res.json());
    }

    /**ADICIONA UMA NOVA PESSOA */
    addPessoa(pessoa: Pessoa) {

        return this.http.post(this.baseUrlService, JSON.stringify(pessoa), this.options)
            .map(res => res.json());
    }
    /**EXCLUI UMA PESSOA */
    excluirPessoa(codigo: number) {

        return this.http.delete(this.baseUrlService + codigo).map(res => res.json());
    }

    /**CONSULTA UMA PESSOA PELO CÓDIGO */
    getPessoa(codigo: number) {

        return this.http.get(this.baseUrlService + codigo).map(res => res.json());
    }

    /**ATUALIZA INFORMAÇÕES DA PESSOA */
    atualizarPessoa(pessoa: Pessoa) {

        return this.http.put(this.baseUrlService, JSON.stringify(pessoa), this.options)
            .map(res => res.json());
    }

    /* IMPRIMIR RELATORIO */
    getDownloadFile() {
        const headers = new Headers({
            "Accept": "application/pdf",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer "
        });
        let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
        this.http.get(this.baseUrlService + 'download', options)
            .toPromise()
            .then(response => this.saveToFileSystem(response));
    }

    private saveToFileSystem(response) {
        const filename = 'relatorioPessoa.pdf'
        const blob = new Blob([response._body], { type: 'application/pdf' });
        /* Opção para salvar o arquivo */
        saveAs(blob, filename);

        /* Opção de abrir no navegador sem salvar */
        /* var fileUrl = URL.createObjectURL(blob);
        window.open(fileUrl); */
    }

    sendEmail(type: string, mensagem: Mensagem) {
        console.log(JSON.stringify(mensagem));
        return this.http.post(this.baseUrlService + 'enviarEmail/' + type, JSON.stringify(mensagem), this.options)
            .map(res => res.json());
    }
}