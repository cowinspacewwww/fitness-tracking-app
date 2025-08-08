package com.fitnessapp.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity

public class Exercise {
    @Id
    @GeneratedValue
    private Long exercise_id;

    private Long user_id;

    private String exercise_name;
    private int sets;
    private String session_id;

    private int repetitions;

    private LocalDate date_of_exercise;

    public String getSession_id() {
        return session_id;
    }

    public void setSession_id(String session_id) {
        this.session_id = session_id;
    }



    public Long getExercise_id() {
        return exercise_id;
    }

    public void setExercise_id(Long exercise_id) {
        this.exercise_id = exercise_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getExercise_name() {
        return exercise_name;
    }

    public void setExercise_name(String exercise_name) {
        this.exercise_name = exercise_name;
    }

    public int getSets() {
        return sets;
    }

    public void setSets(int sets) {
        this.sets = sets;
    }

    public int getRepetitions() {
        return repetitions;
    }

    public void setRepetitions(int repetitions) {
        this.repetitions = repetitions;
    }

    public LocalDate getDate_of_exercise() {
        return date_of_exercise;
    }

    public void setDate_of_exercise(LocalDate date_of_exercise) {
        this.date_of_exercise = date_of_exercise;
    }
}
