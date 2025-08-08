package com.fitnessapp.backend.repository;

import com.fitnessapp.backend.model.Exercise;
import com.fitnessapp.backend.model.ExerciseSession;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExerciseSessionRepository extends JpaRepository<ExerciseSession, String> {

    @Query("SELECT es FROM ExerciseSession es WHERE es.user_id = :user_id")
    List<ExerciseSession> findUserSessions(@Param("user_id") Long user_id);
    @Query("SELECT e FROM Exercise e WHERE e.user_id = :user_id AND e.session_id = :session_id")
    List<Exercise> findExercisesPerSessions(@Param("user_id") Long user_id, @Param("session_id") String session_id);
    @Query("SELECT es FROM ExerciseSession es WHERE es.user_id = :user_id")
    List<ExerciseSession> findByUserId(@Param("user_id") Long user_id);

}
