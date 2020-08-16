package org.example.controller;

import org.example.model.Task;
import org.example.persistence.TaskPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin
public class TaskController {

    @Autowired
    private TaskPersistence taskPersistence;

    @PostMapping(path = "/insTarefa")
    public ResponseEntity<Map<String, Object>> insert(@RequestBody Task task) {
        Map result = new HashMap();
        Map response = new HashMap();

        taskPersistence.insert(task);
        response.put("task", task);

        response.put("sucesso", true);
        response.put("mensagem", "Tarefa inserida com sucesso");
        result.put("result", response);

        return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
    }

    @PutMapping(path = "/altTarefa")
    public ResponseEntity<Map<String, Object>> update(@RequestBody Task task) {
        Map result = new HashMap();
        Map response = new HashMap();

        taskPersistence.update(task);
        response.put("task", task);

        response.put("sucesso", true);
        response.put("mensagem", "Tarefa atualizada com sucesso");
        result.put("result", response);

        return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
    }

    @DeleteMapping(path = "/delTarefa/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Integer id) {
        Map result = new HashMap();
        Map response = new HashMap();

        taskPersistence.delete(id);

        response.put("sucesso", true);
        response.put("mensagem", "Tarefa excluida com sucesso");
        result.put("result", response);

        return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
    }

    @GetMapping(path = "/getAll")
    public ResponseEntity<Map<String, Object>> getAll() {
        Map result = new HashMap();
        Map response = new HashMap();

        response.put("tasks", taskPersistence.getAll());

        response.put("sucesso", true);
        response.put("mensagem", "Consulta realizada com sucesso");
        result.put("result", response);

        return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
    }
}
