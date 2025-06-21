import { Injectable } from '@angular/core';
import {
  WfFormData,
  WfPlatformData,
  WfProcessError,
  WfProcessStep,
  WfVariable,
  WorkflowCockpit,
  workflowCockpit,
} from './workflow-cockpit';
import { WfUser } from './model/user';
import { VariaveisProcessoModel } from '../variaveis.model';

type ErrorFunction = (
  proccessStep: WfProcessError,
  workflow: WorkflowCockpit
) => void;

type SubmitFunction = (
  proccessStep: WfProcessStep,
  workflow: WorkflowCockpit
) => WfFormData;

type ProccessVariables = Record<string, string>;

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  private static readonly EMPTY_PLATFORM_DATA: WfPlatformData = {
    odataUrl: '',
    serviceUrl: '',
    token: undefined,
  };

  private workflow: WorkflowCockpit;
  private errorFunction: ErrorFunction;
  private submitFunction: SubmitFunction;

  constructor() {
    this.workflow = workflowCockpit({
      init: (_, workflow) => {
        this.workflow = workflow;
      },
      onSubmit: (processStep, workflow) => {
        this.workflow = workflow;
        if (this.submitFunction) {
          return this.submitFunction(processStep, workflow);
        }
        return {};
      },
      onError: (processError, workflow) => {
        this.workflow = workflow;
        if (this.errorFunction) {
          this.errorFunction(processError, workflow);
        }
      },
    });
  }

  public onError(fn: ErrorFunction): void {
    this.errorFunction = fn;
  }

  public onSubmit(fn: SubmitFunction): void {
    this.submitFunction = fn;
  }

  /**
   * @description aborta a ação de submit. Este método pode ser utilizado para cancelar a ação de subimit
   * caso o formulário seja inválido.
   */
  public abortSubmit(): void {
    throw new Error('Ação cancelada.');
  }

  public requestPlatformDataAndVariables(): Promise<
    WfPlatformData & ProccessVariables
  > {
    return Promise.all([
      this.requestPlatformData(),
      this.requestProcessVariables(),
    ]).then((results) => {
      const allPromiseResults = results.reduce(
        (previousValue, currentValue) =>
          Object.assign(previousValue, currentValue),
        {}
      );
      return allPromiseResults as WfPlatformData & ProccessVariables;
    });
  }

  // public requestPlatformData(): Promise<WfPlatformData> {
  //   return this.workflow
  //     .getPlatformData()
  //     .then((platform) => platform || WorkflowService.EMPTY_PLATFORM_DATA);
  // }

    public requestPlatformData(): Promise<WfPlatformData> {
    console.warn('[WorkflowService] MOCK de platformData sendo usado');
    return Promise.resolve({
      odataUrl: 'https://mock-odata-url',
      serviceUrl: 'https://mock-service-url',
      token: {
        access_token: 'mock-token'
      }
    });
  }

  // public requestUserData(): Promise<WfUser> {
  //   return this.workflow.getUserData().then((data) => {
  //     if (data) {
  //       const userData: WfUser = Object.assign(new WfUser(), data);

  //       if (userData.username.indexOf('@') >= 0) {
  //         userData.username = userData.username.split('@')[0];
  //       }

  //       return userData;
  //     } else {
  //       return new WfUser();
  //     }
  //   });
  // }

  public requestUserData(): Promise<WfUser> {
  // MOCK: substitui chamada real para getUserData()
  console.warn('[WorkflowService] MOCK de userData sendo usado');
  return Promise.resolve({
      username: 'usuario.mock',
      email: 'mock@senior.com.br'
    } as WfUser);
  }

  public requestProcessVariables(): Promise<VariaveisProcessoModel | ProccessVariables> {
    return this.workflow.getInfoFromProcessVariables().then((wfVariables) => {
      if (wfVariables) {
        return this.parsePendencyData(wfVariables);
      } else {
        return {};
      }
    });
  }

  public getToken(bearer = true): string {
    const TOKEN = sessionStorage.getItem('senior-token') || '';
    return bearer ? `Bearer ${TOKEN}` : TOKEN;
  }

  public getUser(): WfUser {
    return JSON.parse(sessionStorage.getItem('userData') || '{}') as WfUser;
  }

  private parsePendencyData(pendencyData: WfVariable[]): VariaveisProcessoModel {
    const data = {};
    for (const pendency of pendencyData) {
      const attr = pendency;
      if (['Integer', 'Double', 'Float'].includes(attr.type)) {
        data[attr.key] = parseFloat(attr.value);
      } else if (attr.type === 'Date') {
        data[attr.key] = attr.value && attr.value.length > 0 ? new Date(attr.value) : '';
      } else if(attr.type === 'Boolean' || attr.key.toLowerCase().indexOf('json') >=0 ) {
        data[attr.key] = JSON.parse(attr.value);
      } else {
        data[attr.key] = attr.value;
      }
    }
    return data as VariaveisProcessoModel;
  }
}
