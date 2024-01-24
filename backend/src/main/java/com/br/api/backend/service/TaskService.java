package com.br.api.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.br.api.backend.model.TaskModel;
import com.br.api.backend.model.UserModel;
import com.br.api.backend.repository.TaskRepository;
import com.br.api.backend.repository.UserRepository;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository tr;

    @Autowired
    private UserRepository ur;

    public ResponseEntity<?> createTask(TaskModel tm, long userId){
        Optional<UserModel> userOptional = ur.findById(userId);

        if (userOptional.isPresent()) {
            UserModel user = userOptional.get();
            
            tm.setUser(user);

            TaskModel savedTask = tr.save(tm);

            return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Usuário não encontrado", HttpStatus.NOT_FOUND);
        }
    }
}
