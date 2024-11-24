import { Component, LOCALE_ID, OnInit, Output, Pipe } from '@angular/core';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../interfaces/workout';
import { ExercisesService } from '../services/exercises.service';
import { Exercise } from '../interfaces/exercise';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatePipe, formatDate } from '@angular/common';
import { DateService } from '../services/date.service';


@Component({
  selector: 'app-workout-page',
  templateUrl: './workout-page.component.html',
  styleUrls: ['./workout-page.component.css']
})
export class WorkoutPageComponent implements OnInit{
  dateArray: Array<string> = [];

  workoutArray: Workout[] = [];
  exerciseArray: Exercise[] = [];
  bodyPart: string[] = ["Klatka piersiowa", "Biceps", "Triceps", "Nogi", "Plecy"];

  chestExercises: Exercise[] = [];
  bicepsExercises: Exercise[] = [];
  tricepsExercises: Exercise[] = [];
  legsExercises: Exercise[] = [];
  backExercises: Exercise[] = [];
  bodyPartExercisesArray: Exercise[][] = 
    [
      this.chestExercises,
      this.bicepsExercises, 
      this.tricepsExercises, 
      this.legsExercises, 
      this.backExercises
    ];

  selectedPart: number = 0;
  exerciseInput: number = 0;
  dateInput: Date = new Date();
  weightInput: number = 0;
  seriesInput: number = 0;
  repsInput: number = 0;

  //TODO
  //isButtonActive: boolean = false;

  isListExpanded = false;

  mainBodyPart: number[] = [];

  workout: Workout = {
    id: '',
    exerciseId: '',
    date: '',
    weight: 0,
    series: 0,
    reps: 0,
    isCompleted: false
  }

  constructor(private workoutService: WorkoutService, private exerciseService: ExercisesService, private dateService: DateService) {}

  ngOnInit(): void {
    this.dateService.setDateArray(5);
    this.dateArray = this.dateService.getDateArray();
    this.getWorkout();
    this.getExercises();
    this.getExercisesByBodyPart();
    this.getWorkoutByDate();
    this.checkMainBodyPart();
  }

  getWorkout() {
    this.workoutService.getWorkout().subscribe(
      (data) => {
        this.workoutArray = data;
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  getExercises() {
    this.exerciseService.getExercises().subscribe(
      (data) => {
        this.exerciseArray = data;
      },
      (error) => {
        console.log('Error ', error)
      }
    );
  }

  getExercisesByBodyPart() {
    this.exerciseService.getExerciseByBodyPart(this.bodyPartExercisesArray);
  }

  getArrayLastIndex(): number {
    let lastIndex = 1;
    this.workoutService.getWorkout().subscribe(
      (workouts) => {
        workouts.forEach((w) => {
          lastIndex = this.convertIntoNumber(w.id);
        })
      },
      (error) => {
        console.log('Error ', error);
      }
    );

    return lastIndex;
  }

  getWorkoutByDate(): Workout[] {
    let workoutArray: Workout[] = [];
    this.workoutService.getWorkout().subscribe(
      (workouts) => {
        workouts.forEach(w => {
          if(w.date == this.dateService.getFormattedDate(this.dateService.getCurrentDate())) {
            workoutArray.push(w);
          }
        })
      },
      (error) => {
        console.log('Error ', error);
      }
    );

    return workoutArray;
  }

  checkMainBodyPart() {
    this.mainBodyPart = [];
    this.workoutService.getWorkout().subscribe((workouts) => {
      workouts.forEach(w => {
        if(w.date == this.dateService.getFormattedDate(this.dateService.getCurrentDate())) {
          this.exerciseService.getExercises().subscribe((exercise) => {
            exercise.forEach(e => {
              if(w.exerciseId == e.id) {
                this.mainBodyPart.push(e.bodyPartId);
              }
            })
          })
        }
      })
    })
  }

  deleteWorkout(workout: Workout) {
    this.workoutService.deleteWorkout(workout)
      .subscribe({
        next: (data) => {
          console.log('Deleted successfully ', data);
          this.refreshList();
        },
        error: (error) => {
          console.log('Error ', error)
        }
      });
  }

  refreshList() {
    this.workoutArray = [];
    this.getWorkout();
  }

  prevIndex() {
    this.dateService.prevIndex();
    this.checkMainBodyPart();
    this.getWorkoutByDate();
  }

  nextIndex() {
    this.dateService.nextIndex();
    this.checkMainBodyPart();
    this.getWorkoutByDate();
  }

  expandList() {
    this.isListExpanded = !this.isListExpanded;
  }

  convertIntoNumber(str: string) {
    var Num = parseInt(str);
    return Num;
  }

  submitForm() {
    this.fillWorkout();
    this.workoutService.addWorkout(this.workout).subscribe(
      (data) => {
        this.getWorkout();
        console.log(data);
      },
      (error) => {
        console.log('Error ', error);
      }
    );
    this.clearForm();
  }

  clearForm() {
    this.exerciseInput = 0;
    this.weightInput = 0;
    this.seriesInput = 0;
    this.repsInput = 0;
  }

  fillWorkout() {
    this.workout = {
      id: (this.getArrayLastIndex() + 1).toString(),
      exerciseId: this.exerciseInput.toString(),
      date: formatDate(this.dateInput, 'dd.MM.YYYY', 'en'),
      weight: this.weightInput,
      series: this.seriesInput,
      reps: this.repsInput,
      isCompleted: false
    }
  }
  //TODO isWorkoutCompleted
  isWorkoutCompleted(workout: Workout) {
    const dataWorkout = {
      id: workout.id,
      exerciseId: workout.exerciseId,
      date: workout.date,
      weight: workout.weight,
      reps: workout.reps,
      series: workout.series,
      isCompleted: !workout.isCompleted
    }

    this.workoutService.updateWorkout(workout, dataWorkout).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log('Error ', error);
      }
    );
  }

  /*TODO
  ButtonActive() {
    if(this.exerciseInput != 0 && 
      formatDate(this.dateInput, 'dd.MM.YYYY', 'en') != '' && 
      this.weightInput != 0 &&
      this.seriesInput != 0 &&
      this.repsInput != 0) {
        this.isButtonActive = true;
      } else {
        this.isButtonActive = false;
      }
  }
  */

  dominantValueOfExerciseArray(array: number[]): number{
    let bodyPartArray: number[][] = [[], [], [], [], []];

    array.forEach(a => {
        if(a == 1) bodyPartArray[0].push(1);
        if(a == 2) bodyPartArray[1].push(2);
        if(a == 3) bodyPartArray[2].push(3);
        if(a == 4) bodyPartArray[3].push(4);
        if(a == 5) bodyPartArray[4].push(5);
    })

    let max = 0;

    for(let i = 0; i < bodyPartArray.length; i++){
      if(bodyPartArray[i].length > max) {
        max = bodyPartArray[i][0];
      }
    }

    return max;
  }


}
