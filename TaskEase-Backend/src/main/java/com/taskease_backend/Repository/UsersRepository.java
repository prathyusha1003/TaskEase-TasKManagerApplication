package com.taskease_backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskease_backend.Dto.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {

	Users findByEmail(String email);

}