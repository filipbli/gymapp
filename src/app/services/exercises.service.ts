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

  getExercisesById(index: number): Observable<Exercise> {
    return this.httpClient.get<Exercise>(this.exercisesUrl + '/' + index.toString());
  }

  getExerciseByBodyPart(array: Exercise[][]) {
    this.getExercises().subscribe((exercises) => {
      exercises.forEach(e => {
        if(e.bodyPartId == 1) array[0].push(e);
        if(e.bodyPartId == 2) array[1].push(e);
        if(e.bodyPartId == 3) array[2].push(e);
        if(e.bodyPartId == 4) array[3].push(e);
        if(e.bodyPartId == 5) array[4].push(e);
      })
    })
  }

}
