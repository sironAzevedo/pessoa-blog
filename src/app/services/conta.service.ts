import { Injectable } from "@angular/core";
import { Http, ResponseContentType, Headers, RequestOptions } from '@angular/http';
import { ConfigService } from "./config.service";
import { ContaModel } from "../blog-model/conta-model/Conta";

@Injectable()
export class ContaService {
    private baseUrlService: string = '';
    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http,
        private configService: ConfigService) {

        /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
        this.baseUrlService = configService.getUrlService() + '/conta/';

        /*ADICIONANDO O JSON NO HEADER */
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    addConta(conta: ContaModel) {
        return this.http.post(this.baseUrlService, JSON.stringify(conta), this.options)
            .map(res => res.json());
    }

    atualizarConta(conta: ContaModel) {
        return this.http.put(this.baseUrlService, JSON.stringify(conta), this.options)
            .map(res => res.json());
    }

    getContas() {
        return this.http.get(this.baseUrlService).map(res => res.json());
    }

    getConta(codigo: number) {
        return this.http.get(this.baseUrlService + codigo).map(res => res.json());
    }

    excluirPessoa(codigo: number) {
        return this.http.delete(this.baseUrlService + codigo).map(res => res.json());
    }

}