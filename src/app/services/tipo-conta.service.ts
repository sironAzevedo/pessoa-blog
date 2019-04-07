import { Injectable } from "@angular/core";
import { Http, ResponseContentType, Headers, RequestOptions } from '@angular/http';
import { ConfigService } from "./config.service";


@Injectable()
export class TipoContaService {

    private baseUrlService: string = '';
    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http,
        private configService: ConfigService) {

        /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
        this.baseUrlService = configService.getUrlService() + '/tipoconta/';

        /*ADICIONANDO O JSON NO HEADER */
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    getTipoContas() {
        return this.http.get(this.baseUrlService).map(res => res.json());
    }

    getTipoConta(codigo: number) {
        return this.http.get(this.baseUrlService + codigo).map(res => res.json());
    }

}