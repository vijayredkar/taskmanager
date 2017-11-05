package com.todoservice.service.driver;

import java.util.List;

import com.todoservice.datatransferobject.TaskDTO;
import com.todoservice.domainobject.TaskDO;
import com.todoservice.exception.ConstraintsViolationException;
import com.todoservice.exception.EntityNotFoundException;

public interface TaskService
{

    TaskDO find(Long taskId) throws EntityNotFoundException;
    List<TaskDO> findAll() throws EntityNotFoundException;
    TaskDO create(TaskDO taskDO) throws ConstraintsViolationException;
    void delete(Long taskId) throws EntityNotFoundException;
    TaskDO update(long taskId, TaskDTO taskDTO) throws EntityNotFoundException;
}
