import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit, OnChanges{

  @Input() question: string;
  @Input() options: Array<string>;
  @Input() answer: string;

  public disabled: boolean;

  @Output() correct: EventEmitter<any> = new EventEmitter();
  
  constructor(){}
  ngOnInit(){}
  ngOnChanges(){
    this.disabled = false;
  }

  itemChange(value){
    this.disabled = !this.disabled;
    if(this.answer.localeCompare(value) === 0)
       this.correct.emit(true);
    else
       this.correct.emit(false);
  }
}
