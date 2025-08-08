package com.fitnessapp.backend.controller;

import com.fitnessapp.backend.model.Exercise;
import com.fitnessapp.backend.model.ExerciseSession;
import com.fitnessapp.backend.model.User;
import com.fitnessapp.backend.repository.ExerciseRepository;
import com.fitnessapp.backend.repository.ExerciseSessionRepository;
import com.fitnessapp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173/")
public class exerciseSessionController {
    @Autowired
    private ExerciseRepository exerciseRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ExerciseSessionRepository exerciseSessionRepository;

    @PostMapping("/{id}/addSession")
    ResponseEntity<?> newSession(@RequestBody ExerciseSession newExerciseSession){
        String sessionId = newExerciseSession.getExercise_session_id();
        if (exerciseSessionRepository.existsById(sessionId)) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Session ID already exists");
        }
        newExerciseSession.setUser_id(newExerciseSession.getUser_id());
        ExerciseSession savedExerciseSession = exerciseSessionRepository.save(newExerciseSession);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedExerciseSession);
    }

    @GetMapping("/{user_id}/getSessions")
    ResponseEntity<List<ExerciseSession>> getUserSessions(@PathVariable Long user_id) {
        List<ExerciseSession> userExerciseSessions = exerciseSessionRepository.findUserSessions(user_id);

        if (userExerciseSessions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Or return an appropriate message
        }

        return ResponseEntity.ok(userExerciseSessions);
    }

    @GetMapping("/{user_id}/{session_id}")
    ResponseEntity<List<Exercise>> getUserExercisePerSessions(@PathVariable Long user_id, @PathVariable String session_id) {
        List<Exercise> userExercisePerSessions = exerciseSessionRepository.findExercisesPerSessions(user_id, session_id);

        return ResponseEntity.ok(userExercisePerSessions);
    }

    @DeleteMapping("/{user_id}/{session_id}")
    ResponseEntity<?> deleteSession(@PathVariable Long user_id, @PathVariable String session_id) {
        if (!userRepository.existsById(user_id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        ExerciseSession existingSession = exerciseSessionRepository.findById(session_id).orElse(null);
        if (existingSession == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Session not found");
        }

        exerciseRepository.deleteExercisesBySessionId(user_id, session_id);

        exerciseSessionRepository.deleteById(session_id);

        return ResponseEntity.status(HttpStatus.OK).body("Session and associated exercises deleted successfully");
    }

}

