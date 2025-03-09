package com.taskease_backend.Dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.taskease_backend.Dto.Users;
import com.taskease_backend.Repository.UsersRepository;

@Component
public class UserDao {

	@Autowired
	UsersRepository repository;

	public Users fetchByEmail(String email) {
		return repository.findByEmail(email);
	}

	public void saveUser(Users user) {
		repository.save(user);
	}

}