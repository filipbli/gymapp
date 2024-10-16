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

  chestExercises: Exercise[] = [];
  bicepsExercises: Exercise[] = [];
  tricepsExercises: Exercise[] = [];
  legsExercises: Exercise[] = [];
  backExercises: Exercise[] = [];

  bodyPartExercisesArray: Exercise[][] = [];

  isListExpanded = false;

  areListsExpanded: boolean[] = [false, false, false, false, false, false];

  constructor(private exercisesService: ExercisesService) {
    this.bodyPart.push("Klatka piersiowa");
    this.bodyPart.push("Biceps");
    this.bodyPart.push("Triceps");
    this.bodyPart.push("Nogi");
    this.bodyPart.push("Plecy");

    this.bodyPartExercisesArray.push(this.chestExercises);
    this.bodyPartExercisesArray.push(this.bicepsExercises);
    this.bodyPartExercisesArray.push(this.tricepsExercises);
    this.bodyPartExercisesArray.push(this.legsExercises);
    this.bodyPartExercisesArray.push(this.backExercises);
  }

  ngOnInit(): void {
      this.getExercises();
      this.getExercisesByBodyPart();
  }

  getExercises() {
    this.exercisesService.getExercises().subscribe((exercises) => this.exercises = exercises);
  }
  
  getExercisesByBodyPart() {
    this.exercisesService.getExercises().subscribe((exercises) => {
      exercises.forEach(e => {
        if(e.bodyPartId == 1) {
          this.chestExercises.push(e);
        }
        if(e.bodyPartId == 2) {
          this.bicepsExercises.push(e);
        }
        if(e.bodyPartId == 3) {
          this.tricepsExercises.push(e);
        }
        if(e.bodyPartId == 4) {
          this.legsExercises.push(e);
        }
        if(e.bodyPartId == 5) {
          this.backExercises.push(e);
        }
      })
    })
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
