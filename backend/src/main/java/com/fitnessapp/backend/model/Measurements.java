package com.fitnessapp.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;

import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
public class Measurements {
    @Id
    private String measurement_id;
    private Long user_id;

    private Double weight;
    private Double height;
    private Date measured_date;

    @Transient
    private Double bmi;

    public String getMeasurement_id() {
        return measurement_id;
    }

    public void setMeasurement_id(String measurement_id) {
        this.measurement_id = measurement_id;

    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Date getMeasured_date() {
        return measured_date;
    }

    public void setMeasured_date(Date measured_date) {
        this.measured_date = measured_date;
        setMeasurement_id(generateMeasurementId());

    }

    @Transient
    public Double getBmi() {
        if (height == null || weight == null || height == 0) {
            return null; // Handle division by zero or null values
        }
        double heightInMeters = height / 100.0;
        bmi = weight / (heightInMeters * heightInMeters);
        return bmi;
    }

    public void setBmi(Double bmi) {
        this.bmi = bmi;
    }

    private String generateMeasurementId() {
        if (user_id != null && measured_date != null) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
            String dateString = dateFormat.format(measured_date);
            return user_id + dateString;
        }
        return null;
    }
}
