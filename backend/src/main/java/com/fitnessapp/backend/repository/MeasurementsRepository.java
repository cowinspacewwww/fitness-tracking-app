package com.fitnessapp.backend.repository;


import com.fitnessapp.backend.model.Measurements;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeasurementsRepository extends JpaRepository<Measurements,String> {
}
