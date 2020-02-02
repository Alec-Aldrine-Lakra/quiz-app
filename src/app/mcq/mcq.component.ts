import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.css']
})
export class McqComponent implements OnInit {
  public response: any;


  public question: string;
  public options: Array<string>;
  public answer: string;
  public sourcegif: Array<string>;
  public src: any;
  public showGif: boolean;

  private index:number;
  constructor(private questions: QuestionsService, private sanitizer: DomSanitizer) {
    this.index=0;
    this.showGif=false;
  }

  ngOnInit() {
    this.questions.getQuestions().subscribe((val: any)=>{
      this.response = val.results;
      this.sourcegif = ["https://giphy.com/embed/kEKcOWl8RMLde", "https://giphy.com/embed/KDRv3QggAjyo"];
      this.src=this.sourcegif[0];
      this.inputQuestion();
    })
  }

  inputQuestion(){
    this.question = this.domParser(this.response[this.index].question);
    this.answer = this.domParser(this.response[this.index].correct_answer);
    this.response[this.index].incorrect_answers.forEach(element => this.domParser(element));

    this.response[this.index].incorrect_answers.push(this.answer);
    this.options = this.response[this.index].incorrect_answers;
    this.options.sort(()=> Math.random() - 0.5); // answer shuffling
  }

  domParser(input){
     var doc = new DOMParser().parseFromString(input, "text/html");
     return doc.documentElement.textContent;
  }

  checkAnswer(event: any){

    if(event){
      this.src = this.sourcegif[0];
      console.log('Right Answer');
    } else {
      this.src = this.sourcegif[1];
      console.log('Wrong Answer');
    }
    
    this.showGif=!this.showGif;
    this.index++;

    setTimeout(()=>{
      if(this.index<=this.response.length-1){
        this.showGif=!this.showGif;
        this.inputQuestion();
      }
      else
        alert('Quiz over');
    }, 3000);
  }
}
