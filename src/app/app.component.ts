import { Component, OnInit } from '@angular/core';
import { VersaoService } from '@services/versao.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private versaoService: VersaoService) {}

  get validaVersao(): boolean {
    return environment.valida_versao;
  }

  get versao(): string {
    return environment.versao;
  }

  get ambiente(): string {
    return environment.ambiente;
  }

  versaoInvalida = this.validaVersao;
  complete = false;

  ngOnInit(): void {
    if (environment.valida_versao) {
      this.versaoService.buscarVersao().subscribe(v => {
        this.versaoInvalida = v !== this.versao;
        this.complete = true;
      })
    } else {
      this.complete = true;
    }
  }

}
