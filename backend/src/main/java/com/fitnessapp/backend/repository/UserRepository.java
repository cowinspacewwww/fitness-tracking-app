package com.fitnessapp.backend.repository;

import com.fitnessapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
    User findByUsernameAndPassword(String username, String password);

}
