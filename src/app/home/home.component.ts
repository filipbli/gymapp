import { Component, OnInit } from '@angular/core';
import { ExercisesService } from '../services/exercises.service';
import { Exercise } from '../interfaces/exercise';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  $exercises: Observable<Exercise[]> | undefined;
  exercises: Exercise[] = [];
  exercise: Exercise | undefined;

  date: Date = new Date();

  number: string = '';

  constructor( private exercisesService: ExercisesService) {
  }

  ngOnInit(): void {
      this.$exercises = this.exercisesService.getExercises();
      this.getExercises();
  }
  
  getExerciseById(index: number) {
    this.exercisesService.getExercisesById(index).subscribe((data) => 
      this.exercise = data
    );
  }

  getExercises() {
    this.exercisesService.getExercises().subscribe((data) => this.exercises = data);
  }

}
