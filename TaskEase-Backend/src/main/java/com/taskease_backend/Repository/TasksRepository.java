package com.taskease_backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskease_backend.Dto.Tasks;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, Integer> {

	List<Tasks> findByUserId(int userId);
	
}