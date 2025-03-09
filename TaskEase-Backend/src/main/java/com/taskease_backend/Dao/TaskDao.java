package com.taskease_backend.Dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.taskease_backend.Dto.Tasks;
import com.taskease_backend.Repository.TasksRepository;

@Component
public class TaskDao {

	@Autowired
	TasksRepository repository;

	public Tasks saveTask(Tasks task) {
		return repository.save(task);
	}
	
	public List<Tasks> getTasksByUserId(int userId) {
        return repository.findByUserId(userId);
    }
	
	public Optional<Tasks> findById(int id) {
		return repository.findById(id);
	}

	public void delete(int taskId) {
		if (repository.existsById(taskId)) {
            repository.deleteById(taskId);
        } else {
            throw new RuntimeException("Task not found with ID: " + taskId);
        }
	}

}