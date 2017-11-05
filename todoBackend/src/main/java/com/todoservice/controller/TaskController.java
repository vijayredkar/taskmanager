package com.todoservice.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.todoservice.controller.mapper.TaskMapper;
import com.todoservice.datatransferobject.TaskDTO;
import com.todoservice.domainobject.TaskDO;
import com.todoservice.exception.ConstraintsViolationException;
import com.todoservice.exception.EntityNotFoundException;
import com.todoservice.service.driver.TaskService;

/**
 * All operations with a task will be routed by this controller.
 * <p/>
 */
@RestController
@RequestMapping("v1/tasks")
@CrossOrigin( origins = "http://localhost:3000")
public class TaskController
{
    private final TaskService taskService;
    
    @Autowired
    public TaskController(final TaskService taskService)
    {
        this.taskService = taskService;
    }

    @GetMapping("/{taskId}")
    public TaskDTO getTask(@Valid @PathVariable long taskId) throws EntityNotFoundException
    {
        return TaskMapper.makeTaskDTO(taskService.find(taskId));
    }
    
    @GetMapping
    public List<TaskDTO> getAllTasks() throws ConstraintsViolationException, EntityNotFoundException
    {
       return TaskMapper.makeTaskDTOList(taskService.findAll());
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskDTO createTask(@Valid @RequestBody TaskDTO taskDTO) throws ConstraintsViolationException
    {
        TaskDO taskDO = TaskMapper.makeTaskDO(taskDTO);
        return TaskMapper.makeTaskDTO(taskService.create(taskDO));
    }


    @DeleteMapping("/{taskId}")
    public void deleteTask(@Valid @PathVariable long taskId) throws EntityNotFoundException
    {
        taskService.delete(taskId);
    }

    //@CrossOrigin( origins = "http://localhost:3000")
    @PutMapping("/{taskId}")
    public TaskDO updateTask(@Valid @PathVariable long taskId, @RequestBody TaskDTO taskDTO)	
        throws ConstraintsViolationException, EntityNotFoundException
    {
       return taskService.update(taskId, taskDTO);
    }
}
