# Angular Composable X

## 🚀 Sobre
Projeto base para criação de BPMs (Formulário WEB). Épico de desenvolvimento do projeto: #FABPRH-4079

## 📝 Requisitos
- Node v21.7.3
- Npm 10.5.0

## 🛠️ Criando etapas
Atualmente estamos trabalhando com módulos, é aconselhado seguir o seguinte modelo para mapear e criar as etapas:

Para cada etapa, criar um módulo pelo comando (Exemplo etapa de solicitação):
```
ng g m --routing modules/solicitacao
```

Após isso, criar o componente:
```
ng g c modules/solicitacao
```

No arquivo "solicitacao-routing.module.ts", apontar o path para o componente criado. Exemplo:
```Javascript
const routes: Routes = [
  { path: '', component: SolicitacaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitacaoRoutingModule { }
```

Após isso, configurar a rota no app-routing.module.ts. Exemplo:
```Javascript
const routes: Routes = [
  {
    path: 'solicitacao',
    loadChildren: () =>
      import('./modules/solicitacao/solicitacao.module').then(
        (m) => m.SolicitacaoModule
      ),
  },
];
```

Obs.: Sempre que necessário utilizar um componente, importar no módulo. Exemplo:
```Javascript
// Importação do componente do primeNg
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [
    SolicitacaoComponent
  ],
  imports: [
    CommonModule,
    SolicitacaoRoutingModule,
    RadioButtonModule, //-- Adicionado nos imports do módulo
  ],
  exports: [
    SolicitacaoComponent
  ]
})
export class SolicitacaoModule { }
```

## 🔩 Workflow Service:
Na biblioteca do cockpit do BPM, temos o serviço WorkflowService que fica responsável pela declaração do submit do BPM e do carregamento de variáveis e informações do processo. 

Declaração do WorkflowService: Declarar no construtor do componente:
```Javascript
constructor(private wfService: WorkflowService) {}
```

Declarar submit: Função que irá executar ao clicar no botão "Enviar do BPM":
1) Criar função que retorne WfFormData:
```Javascript
submitForm(): WfFormData {
  return {
    formData: {
      //... Inserir aqui as variáveis do processo cadastrado na plataforma
    }
  }
}
```

2) Declarar no onInit do componente:
```Javascript
ngOnInit(): void {
  this.wfService.onSubmit(this.submitForm.bind(this));
}
```

A função de submit pode receber como parâmetro os objetos: WfProcessStep e WorkflowCockpit, contendo informações do BPM.
Exemplo de uso:
```Javascript
submitForm(step: WfProcessStep): WfFormData {
  // Número da tarefa do BPM (Instância)
  const numeroProcesso = step.processInstanceId;
  // Valor selecionado no combo "Enviar para" da plataforma
  const valorGateway = step.nextAction.name;

  return {
    formData: {
      //...
    }
  }
}
```

Quando necessário resgatar as variáveis da plataforma, efetuar a busca da seguinte forma:
```Javascript
this.wfService.requestProcessVariables().then((variaveis) => {
  // ...
}
```

## 📦 Invoke
Para as chamadas de plugins invoke, tanto leitura quanto gravação, pode-se usar o serviço "InvokeService", função: "post" passando como parâmetro: "service", "port", "typedResponse" e um objeto com os parâmetros adicionais.

O parâmetro "typedResponse" é uma flag que controla se o retorno deve ser tipado automaticamente ou não. O valor padrão para essa propriedade é 'false'.
Para que a resposta seja tipada automaticamente, a nomenclatura dos dados do retorno deve seguir o padrão descrito nessa documentação(link).

Exemplo de uso:
```Javascript
export interface ColaboradorModel {
  alfNome: string;
  numCadastro: string;
  numEmpresa: string;
  numTipoColaborador: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(private invokeService: InvokeService) { }

  buscaColaborador(): Observable<ColaboradorModel> {
    const filtros = {
      'top': '10',
      'skip': '0',
      'filter': ''
    };
    const tiparRetorno = true;

    return this.invokeService
      .obterDadosXT<ColaboradorModel>('br.com.senior.validacao.composable', 'buscarColaborador', filtros, tiparRetorno);
  }
}
```
Obs.: Necessário configurar no environment a URL do server de acesso à G5.

## 📌 Controle de versão
Foi criado um controle de versão no app.component.ts, para isso é necessário configurar no environment:
```
valida_versao: true,
versao: '1.0.0',
ambiente: 'D'
```

No "versão.service.ts" implementar a busca na função "buscarVersao" retornando a string com a versão configurada no environment. Foi adicionado o ambiente para distinguir as configurações do environment.

## 📌 Servidor Mock
Para trabalhar com a API invoke que obtém dados do XT, foi criado o script "mock". A configuração dos dados mockados deve ser feita em 2 arquivos

1) mock-server\mock.out.config.json: Onder serão configurados mocks de erros:
```Json
{
  "error": false, //Habilita/Desabilita as respostas de erro
  "timeout": [
    //Deve ser incluído o nome das portas que devem ter o erro de timeout
  ],
  "erroExecucao": [
    //Deve ser incluído o nome das portas que devem ter o erro de timeout
  ]
}
```

2) mock-server\mock.out.json
```Json
{
  "rubi": { //Nome do módulo
    "com.senior.teste": { //Nome do serviço
      "buscarDadosTeste": { //Nome da porta
        //Dados de retorno
        "retorno": [
          {
            "nome": "João",
            "idade": 25
          },
          {
            "nome": "Maria",
            "idade": 30
          }
        ]
      }
    }
  }
}
```

Para iniciar o servidor, deve ser usado o comando `npm run mock`. Este iniciará na porta 80.
