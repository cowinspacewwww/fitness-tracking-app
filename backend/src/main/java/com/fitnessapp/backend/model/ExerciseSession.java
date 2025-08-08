package com.fitnessapp.backend.model;

import jakarta.persistence.*;

import java.text.SimpleDateFormat;
import java.util.Date;
@Entity
public class ExerciseSession {
    @Id
    private String exercise_session_id;

    private Long user_id;

    private Date session_date;

    public String getExercise_session_id() {
        return exercise_session_id;
    }
    public void setExercise_session_id() {
        if (user_id != null && session_date != null) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
            String dateString = dateFormat.format(session_date);

            this.exercise_session_id = user_id + dateString;
        }
    }
    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
        setExercise_session_id();
    }

    public Date getSession_date() {
        return session_date;
    }

    public void setSession_date(Date session_date) {
        this.session_date = session_date;
        setExercise_session_id();

    }
}
