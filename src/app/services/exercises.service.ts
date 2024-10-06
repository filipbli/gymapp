import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from '../interfaces/exercise';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  private exerciseSubject = new BehaviorSubject<Exercise[]>([]);
  exercises$: Observable<Exercise[]> = this.exerciseSubject.asObservable();

  exercisesUrl = 'http://localhost:3000/exercises';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor( private httpClient: HttpClient) { 
    this.fetchExerices();
  }

  private fetchExerices() {
    this.httpClient.get<Exercise[]>(this.exercisesUrl).subscribe(
      exercises => this.exerciseSubject.next(exercises)
    );
  }

  getExercises(): Observable<Exercise[]> {
    return this.exercises$;
  }



}
