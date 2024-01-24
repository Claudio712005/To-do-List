package com.br.api.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.br.api.backend.model.TaskModel;
import com.br.api.backend.service.TaskService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskService ts;
    
    @PostMapping("/tasks/{id}")
    public ResponseEntity<?> createTask(@RequestBody TaskModel tm, @PathVariable long id) {
        return ts.createTask(tm, id);
    }

    @DeleteMapping("/tasks/{idTask}")
    public ResponseEntity<?> deleteMyTask(@PathVariable int idTask){
        return ts.deleteTask(idTask);
    }    
}
