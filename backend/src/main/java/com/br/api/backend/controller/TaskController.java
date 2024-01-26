package com.br.api.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.br.api.backend.model.TaskModel;
import com.br.api.backend.service.TaskService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskService ts;
    
    @PostMapping("/tasks/{id}")
    public ResponseEntity<?> createTask(@RequestBody TaskModel tm, @PathVariable int id) {
        return ts.createTask(tm, id);
    }

    @DeleteMapping("/tasks/{idTask}")
    public ResponseEntity<?> deleteMyTask(@PathVariable int idTask){
        return ts.deleteTask(idTask);
    }

    @PutMapping("/tasks/{idTask}")
    public ResponseEntity<?> editTask(@RequestBody TaskModel tm, @PathVariable int idTask){
        return ts.editTask(tm);
    }

    @GetMapping("/tasks/{id}")
    public  ResponseEntity<?> findUserTasks(@PathVariable int id){
        return ts.findTaskByIdUser(id);
    }

    @GetMapping("/tasks/myTask/{idTask}")
    public ResponseEntity<?> showTask(@PathVariable int idTask){
        return ts.showTask(idTask);
    }

    @GetMapping("/tasks/notDone/{id}")
    public  ResponseEntity<?> findTaskNotDone(@PathVariable int id){
        return ts.findTaskNotDone(false, id);
    }

    @GetMapping("/tasks/orderedPriority/{id}")
    public  ResponseEntity<?> orderByPriority(@PathVariable int id){
        return ts.findTaskOrderedByDescPriority(id);
    }

    @PutMapping("/tasks/editDescp/{idTask}")
    public ResponseEntity<?> editDescription(@PathVariable int idTask, @RequestBody String tm){
        return ts.editDescriptionTask(idTask, tm);
    }
}
