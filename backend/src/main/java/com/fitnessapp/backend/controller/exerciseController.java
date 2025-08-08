package com.fitnessapp.backend.controller;

import com.fitnessapp.backend.exception.ExerciseNotFoundException;
import com.fitnessapp.backend.exception.UserNotFoundException;
import com.fitnessapp.backend.model.Exercise;
import com.fitnessapp.backend.model.User;
import com.fitnessapp.backend.repository.ExerciseRepository;
import com.fitnessapp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173/")
public class exerciseController {
    @Autowired
    private ExerciseRepository exerciseRepository;
    @Autowired
    private UserRepository userRepository;


    @PostMapping("/{user_id}/addExercise")
    Exercise newExercise(@RequestBody Exercise newExercise, @PathVariable Long user_id){
//        Long userId = newExercise.getUser_id();
        if (!userRepository.existsById(user_id)) {
            throw new UserNotFoundException(user_id);
        }

        // Set the user_id for the new exercise
        newExercise.setUser_id(user_id);

        return exerciseRepository.save(newExercise);
    }

    @PostMapping("/{user_id}/{session_id}/addExercise")
    Exercise newExercise(@RequestBody Exercise newExercise, @PathVariable Long user_id, @PathVariable String session_id){
//        Long userId = newExercise.getUser_id();
        if (!userRepository.existsById(user_id)) {
            throw new UserNotFoundException(user_id);
        }

        // Set the user_id for the new exercise
        newExercise.setUser_id(user_id);

        return exerciseRepository.save(newExercise);
    }


    @GetMapping("/{user_id}/exercises")
    List<Exercise> getExercisesByUserId(@PathVariable Long user_id) {
        return exerciseRepository.findByUserId(user_id);
    }

    @GetMapping("/{user_id}/exercise/{exercise_id}")
    Exercise getOneExercise( @PathVariable Long user_id, @PathVariable Long exercise_id){
        return exerciseRepository.findByExerciseId(user_id, exercise_id);
    }

    @PutMapping("/{user_id}/exercise/{exercise_id}")
    Exercise updateExercise(@RequestBody Exercise newExercise, @PathVariable Long user_id, @PathVariable Long exercise_id){
        Exercise existingExercise = exerciseRepository.findByExerciseId(user_id, exercise_id);

        if (existingExercise != null) {
            if (newExercise.getSession_id() != null && !newExercise.getSession_id().isEmpty()) {
                existingExercise.setSession_id(newExercise.getSession_id());
            }
            existingExercise.setExercise_name(newExercise.getExercise_name());
            existingExercise.setSets(newExercise.getSets());
            existingExercise.setRepetitions(newExercise.getRepetitions());
            existingExercise.setDate_of_exercise(newExercise.getDate_of_exercise());

            return exerciseRepository.save(existingExercise);
        } else {
            throw new ExerciseNotFoundException(user_id, exercise_id);
        }

    }


    @DeleteMapping("/{user_id}/exercise/{exercise_id}")
    String deleteExercise(@PathVariable Long user_id, @PathVariable Long exercise_id){
        if(!userRepository.existsById(user_id)){
            throw new UserNotFoundException(user_id);

        }
        Exercise existingExercise = exerciseRepository.findByExerciseId(user_id, exercise_id);
        if(existingExercise == null){
            throw new ExerciseNotFoundException(user_id, exercise_id);
        }
        exerciseRepository.deleteByExerciseId(user_id, exercise_id);
        return "Exercise " + exercise_id + " by user " + user_id + " has been deleted";
    }

}
