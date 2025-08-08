package com.fitnessapp.backend.exception;

public class ExerciseNotFoundException extends RuntimeException{
    public ExerciseNotFoundException(Long user_id, Long exercise_id){
        super("Exercise with id " + exercise_id + " under user " + user_id + " does not exist.");
    }
}
