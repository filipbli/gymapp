import { ErrorHandler, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Workout } from '../interfaces/workout';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private workoutSubject = new BehaviorSubject<Workout[]>([]);
  workout$: Observable<Workout[]> = this.workoutSubject.asObservable();

  workoutUrl = "http://localhost:3000/workout";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) {
    this.fetchWorkout();
  }

  private fetchWorkout() {
    this.httpClient.get<Workout[]>(this.workoutUrl, this.httpOptions).subscribe(
      (workout) => this.workoutSubject.next(workout)
    );
  }

  getWorkout(): Observable<Workout[]> {
    return this.workout$;
  }

  addWorkout(workout: Workout): Observable<Workout> {
    return this.httpClient.post<Workout>(this.workoutUrl, workout, this.httpOptions).pipe(
      tap(() => this.fetchWorkout())
    );
  }

  updateWorkout(workout: Workout, data: any) {
    return this.httpClient.put<Workout>(`${this.workoutUrl}/${workout.id}`, data).pipe(
      tap(() => this.fetchWorkout())
    );
  }

  deleteWorkout(workout: Workout): Observable<Workout> {
    return this.httpClient.delete<Workout>(`${this.workoutUrl}/${workout.id}`).pipe(
      tap(() => this.fetchWorkout())
    );
    /*
    this.httpClient.delete<Workout>(`${this.workoutUrl}/${workout.id}`).subscribe({
      next: () => {
        console.log('Deleted successfully');
      },
      error: error => {
        console.log('Error ', error);
      }
    });
    */
  }

}
