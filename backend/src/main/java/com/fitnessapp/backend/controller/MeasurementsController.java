package com.fitnessapp.backend.controller;

import com.fitnessapp.backend.exception.UserNotFoundException;
import com.fitnessapp.backend.model.Measurements;
import com.fitnessapp.backend.model.User;
import com.fitnessapp.backend.repository.ExerciseRepository;
import com.fitnessapp.backend.repository.ExerciseSessionRepository;
import com.fitnessapp.backend.repository.MeasurementsRepository;
import com.fitnessapp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173/")
public class MeasurementsController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ExerciseRepository exerciseRepository;
    @Autowired
    private ExerciseSessionRepository exerciseSessionRepository;
    @Autowired
    private MeasurementsRepository measurementsRepository;

    @PostMapping("/{user_id}/{session_id}/setMeasurements")
    ResponseEntity<?> newMeasurement(@RequestBody Measurements newMeasurement, @PathVariable Long user_id, @PathVariable String session_id) {
        try {
            if (!userRepository.existsById(user_id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID " + user_id + " not found.");
            }
            newMeasurement.setUser_id(Long.valueOf(user_id));
            newMeasurement.setMeasurement_id(session_id);


            Measurements savedMeasurement = measurementsRepository.save(newMeasurement);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedMeasurement);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @GetMapping("{user_id}/{session_id}/getMeasurements")
    Measurements getSessionMeasurement(@PathVariable Long user_id, @PathVariable String session_id){
        return measurementsRepository.findById(session_id).orElseThrow(()->new UserNotFoundException(user_id));
    }

    @PutMapping("/{user_id}/{session_id}/updateMeasurements")
    ResponseEntity<?> updateMeasurement(@RequestBody Measurements updatedMeasurement, @PathVariable Long user_id, @PathVariable String session_id) {
        try {
            if (!userRepository.existsById(user_id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID " + user_id + " not found.");
            }

            Measurements existingMeasurement = measurementsRepository.findById(session_id).orElse(null);

            if (existingMeasurement == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Measurement with ID " + session_id + " not found.");
            }


            if (updatedMeasurement.getWeight() != null) {
                existingMeasurement.setWeight(updatedMeasurement.getWeight());
            }
            if (updatedMeasurement.getHeight() != null) {
                existingMeasurement.setHeight(updatedMeasurement.getHeight());
            }

            Measurements updatedMeasurementResult = measurementsRepository.save(existingMeasurement);
            return ResponseEntity.ok(updatedMeasurementResult);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }

}}
