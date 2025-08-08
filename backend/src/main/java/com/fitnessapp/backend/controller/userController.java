package com.fitnessapp.backend.controller;

import com.fitnessapp.backend.exception.UserNotFoundException;
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
public class userController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ExerciseRepository exerciseRepository;
    @Autowired
    private ExerciseSessionRepository exerciseSessionRepository;


    @PostMapping("/addUser")
    ResponseEntity<?> newUser(@RequestBody User newUser) {
        // Check if the username or email already exists
        if (userRepository.existsByUsername(newUser.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }

        if (userRepository.existsByEmail(newUser.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }

        // If username and email are unique, proceed with user registration
        User savedUser = userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }


    @GetMapping("/users")
    List<User> getAllUsers(){
        return userRepository.findAll();
    }
    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id){
        return userRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));
    }


    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id){
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(newUser.getUsername());
                    user.setPassword(newUser.getPassword());
                    user.setEmail(newUser.getEmail());
                    user.setBirthday(newUser.getBirthday());
                    return userRepository.save(user);
                }).orElseThrow(()->new UserNotFoundException(id));
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User loginUser) {
        User user = userRepository.findByUsernameAndPassword(loginUser.getUsername(), loginUser.getPassword());

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }

        // Fetch the user
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        // Fetch and delete exercise sessions
        List<ExerciseSession> exerciseSessions = exerciseSessionRepository.findByUserId(id);
        for (ExerciseSession exerciseSession : exerciseSessions) {
            // Fetch and delete exercises for each exercise session
            List<Exercise> exercises = exerciseRepository.findByUserId(id);
            exerciseRepository.deleteAll(exercises);
        }
        exerciseSessionRepository.deleteAll(exerciseSessions);

        // Delete the user
        userRepository.deleteById(id);

        return "User with ID " + id + " has been deleted successfully";
    }
}