package com.br.api.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.br.api.backend.model.TaskModel;


@Repository
public interface TaskRepository extends CrudRepository<TaskModel, Long>{
    
}
