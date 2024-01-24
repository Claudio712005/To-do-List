package com.br.api.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.br.api.backend.model.TaskModel;
import java.util.List;



@Repository
public interface TaskRepository extends CrudRepository<TaskModel, Integer>{
    
    List<TaskModel> findByIdTask(int idTask);

    TaskModel countByIdTask(int idTask);
    
    List<TaskModel> findByUser_Id(int fkUser);
}
