import { Injectable } from "@angular/core";
import { Http, ResponseContentType, Headers, RequestOptions } from '@angular/http';
import { ConfigService } from "./config.service";
import { MesSalarioModel } from "../blog-model/mes-salario-model/mes-salario";

@Injectable()
export class MesSalarioService {

    private baseUrlService: string = '';
    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http,
        private configService: ConfigService) {

        /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
        this.baseUrlService = configService.getUrlService() + '/salario/';

        /*ADICIONANDO O JSON NO HEADER */
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    addMesSalario(mesSalario: MesSalarioModel) {
        return this.http.post(this.baseUrlService, JSON.stringify(mesSalario), this.options)
            .map(res => res.json());
    }

    atualizarMesSalario(mesSalario: MesSalarioModel) {
        return this.http.put(this.baseUrlService, JSON.stringify(mesSalario), this.options)
            .map(res => res.json());
    }

    getMesSalarios() {
        return this.http.get(this.baseUrlService).map(res => res.json());
    }

    getMesSalario(codigo: number) {
        return this.http.get(this.baseUrlService + codigo).map(res => res.json());
    }

    excluirMesSalario(codigo: number) {
        return this.http.delete(this.baseUrlService + codigo).map(res => res.json());
    }

}
