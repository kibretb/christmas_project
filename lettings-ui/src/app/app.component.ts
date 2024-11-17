import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {  HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'lettings-ui';
  quotes:any = [];
  joke: any ={};
  categories: string[] = [
    'age', 'alone', 'amazing', 'anger', 'architecture', 'art', 'attitude', 'beauty', 
    'best', 'birthday', 'business', 'car', 'change', 'communication', 'computers', 
    'cool', 'courage', 'dad', 'dating', 'death', 'design', 'dreams', 'education', 
    'environmental', 'equality', 'experience', 'failure', 'faith', 'family', 'famous', 
    'fear', 'fitness', 'food', 'forgiveness', 'freedom', 'friendship', 'funny', 'future', 
    'god', 'good', 'government', 'graduation', 'great', 'happiness', 'health', 'history', 
    'home', 'hope', 'humor', 'imagination', 'inspirational', 'intelligence', 'jealousy', 
    'knowledge', 'leadership', 'learning', 'legal', 'life', 'love', 'marriage', 'medical', 
    'men', 'mom', 'money', 'movies', 'success'
  ];

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.get_quotes(); 
    this.get_jokes();
  }

  get_quotes(category='dreams'){
    let apiUrl = `${environment.apiUrl}quotes?category=${category}`;
    this.http.get(apiUrl).subscribe((res)=>{
        this.quotes = res;
    })
  }

  get_jokes(){
    this.http.get(environment.apiUrl+"jokes").subscribe((res)=>{
      this.joke = res;
    })
  }

  onCategoryChange(event: any) {
    const selectedCategory = event.target.value;
    this.get_quotes(selectedCategory);
  }

  regenerateJoke() {
    this.get_jokes();
  }
}
