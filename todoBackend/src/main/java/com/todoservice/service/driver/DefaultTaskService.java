package com.todoservice.service.driver;

import java.time.ZonedDateTime;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.todoservice.dataaccessobject.TaskRepository;
import com.todoservice.datatransferobject.TaskDTO;
import com.todoservice.domainobject.TaskDO;
import com.todoservice.exception.ConstraintsViolationException;
import com.todoservice.exception.EntityNotFoundException;

/**
 * Service to encapsulate the link between DAO and controller and to have business logic for some task specific things.
 * <p/>
 */
@Service
public class DefaultTaskService implements TaskService
{

    private static org.slf4j.Logger LOG = LoggerFactory.getLogger(DefaultTaskService.class);    
    private final TaskRepository taskRepository;    
    
    public DefaultTaskService(final TaskRepository taskRepository)
    {
        this.taskRepository = taskRepository;
    }

    /**
     * Selects a task by id.
     *
     * @param taskId
     * @return found task
     * @throws EntityNotFoundException if no task with the given id was found.
     */
    @Override
    public TaskDO find(Long taskId) throws EntityNotFoundException
    {
        return findTaskChecked(taskId);
    }

    @Override
    public List<TaskDO> findAll() throws EntityNotFoundException
    {
        return (List<TaskDO>) taskRepository.findAll();
    }    

    /**
     * Creates a new task.
     *
     * @param taskDO
     * @return
     * @throws ConstraintsViolationException if a task already exists with the given username, ... .
     */
    @Override
    public TaskDO create(TaskDO taskDO) throws ConstraintsViolationException
    {
        TaskDO task;
        try
        {
            task = taskRepository.save(taskDO);
        }
        catch (DataIntegrityViolationException e)
        {
            LOG.warn("Some constraints are thrown due to task creation", e);
            throw new ConstraintsViolationException(e.getMessage());
        }
        return task;
    }


    /**
     * Deletes an existing task by id.
     *
     * @param taskId
     * @throws EntityNotFoundException if no task with the given id was found.
     */
    @Override
    @Transactional
    public void delete(Long taskId) throws EntityNotFoundException
    {
        TaskDO taskDO = findTaskChecked(taskId);
        taskRepository.delete(taskId);
    }
    
    @Override
    @Transactional
    public TaskDO update(long taskId, TaskDTO taskDTO) throws EntityNotFoundException
    {
        TaskDO existingTaskDO = findTaskChecked(taskId);
        
        existingTaskDO.setName(taskDTO.getName());
    	existingTaskDO.setDesc(taskDTO.getDesc());
    	existingTaskDO.setStatus(taskDTO.getStatus());
    	existingTaskDO.setDateUpdated(ZonedDateTime.now());
    	
    	return taskRepository.save(existingTaskDO);
    }

    @Transactional(readOnly = true)
    private TaskDO findTaskChecked(Long taskId) throws EntityNotFoundException
    {
        TaskDO taskDO = taskRepository.findOne(taskId);
        if (taskDO == null)
        {
            throw new EntityNotFoundException("Could not find entity with id: " + taskId);
        }
        return taskDO;
    }
}