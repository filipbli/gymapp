import { Component, OnInit } from '@angular/core';
import { ExercisesService } from '../services/exercises.service';
import { Observable } from 'rxjs';
import { Exercise } from '../interfaces/exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit{

  exercises: Exercise[] = [];
  bodyPart: string[] = [];

  isListExpanded = false;

  areListsExpanded: boolean[] = [false, false, false, false, false, false];

  constructor(private exercisesService: ExercisesService) {
    this.bodyPart.push("Klatka piersiowa");
    this.bodyPart.push("Biceps");
    this.bodyPart.push("Triceps");
    this.bodyPart.push("Nogi");
    this.bodyPart.push("Plecy");
  }

  ngOnInit(): void {
      this.getExercises();
  }

  getExercises() {
    this.exercisesService.getExercises().subscribe((exercises) => this.exercises = exercises);
  }

  expandList() {
    if(this.isListExpanded) {
      this.isListExpanded = false;
    } else {
      this.isListExpanded = true;
    }
  }

  expandListById(id: number) {
    if(this.areListsExpanded[id]) {
      this.areListsExpanded[id] = false;
    } else {
      this.areListsExpanded[id] = true;
    }
  }
}
