import { merge, Subscription } from 'rxjs';
import { AcoesService } from './acoes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from './modelo/acoes';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
const tempo = 300

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes().pipe(tap(()=>{console.log('Fluxo inicial')}))
  filtro$= this.acoesInput.valueChanges.pipe(tap(()=>console.log('Fluxo do filtro')),
  debounceTime(tempo),
  tap(console.log),
  filter((valorDigitado)=> valorDigitado.length >= 3 || !valorDigitado.length),
  distinctUntilChanged(),
  switchMap((valorDigitado)=>this.acoesService.getAcoes(valorDigitado)))
  acoes$= merge(this.todasAcoes$,this.filtro$)


  constructor(private acoesService: AcoesService) { }
}
