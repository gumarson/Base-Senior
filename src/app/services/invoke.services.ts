import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OutputData, ResponseModel } from './response.model';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { parse  } from 'date-fns';

export type module = 'rubi' | 'ronda' | 'bs' | 'cs' | 'jr' | 'plr' | 'ql' | 'rs' | 'sm' | 'tr';

@Injectable({providedIn: 'root'})
export class InvokeService {
  private invoke = 'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/conector/actions/invoke';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  obterDadosXT<T extends OutputData>(
    service: string,
    port: string,
    module: module,
    args: Record<string, any>,
    typedResponse: boolean = false
  ): Observable<ResponseModel<T> | any> {


    const PLUGIN_ID = 'f2200c3b-c7df-4040-9613-34f697b75889';


    if (environment.ambiente === 'D') {
      this.invoke = 'http://localhost:8080/t/senior.com.br/bridge/1.0/rest/platform/conector/actions/invoke'
    }

    const body = {
      inputData:{
        port,
        server: environment.server,
        encryption:'3',
        password: '',
        user: '',
        service,
        module,
        ...args
      },
      id: PLUGIN_ID
    };

    return this.http.post<ResponseModel<T> | any>(this.invoke, body)
      .pipe(
        map(response => {
          if (typedResponse) {
            return this.parseResponse<T>(response.outputData);
          }

          return response.outputData;
        })
      )
  }

  sendError(title: string, message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: title,
      detail: message || 'Não foi possível efetuar a solicitação, tente novamente mais tarde!',
      sticky: true
    });
  }


  private parseResponse<T extends OutputData>(data: T): ResponseModel<T> {
    const parsedObj= this.convertStringsToTypes(data);

    return { outputData: parsedObj };
  }

  private convertStringsToTypes<T>(obj: T): T {
    for (const key in obj) {
      const type = key.substring(0, 3);

      if (type === 'tab' && obj[key] && Array.isArray(obj[key])) {
        obj[key] = (obj[key] as any[]).map((item: any) => this.convertStringsToTypes(item)) as T[Extract<keyof T, string>];
      } else if (type === 'tab' && obj[key] && typeof obj[key] === 'object') {
        obj[key] = [ this.convertStringsToTypes(obj[key]) ] as unknown as T[Extract<keyof T, string>];
      } else if (typeof obj[key] === 'string') {

        if (obj[key] && type && (type === 'num')) {
          obj[key] = parseFloat(obj[key]) as unknown as T[Extract<keyof T, string>];
        }

        if (obj[key] && type && (type === 'dat')) {
          if (typeof obj[key] === 'string') {
            obj[key] = this.parseBrazilianDate(obj[key]) as unknown as T[Extract<keyof T, string>];
          }
        }

      }
    }
    return obj;
  }

  private parseBrazilianDate(dateString: string): Date {

    try {
      return parse(dateString, 'dd/MM/yyyy', new Date());
    } catch (error) {
      console.error('Error parsing date:', error);
      this.sendError('Erro ao converter a data', 'Formato de data inválido');
      return null;
    }

  }

}
