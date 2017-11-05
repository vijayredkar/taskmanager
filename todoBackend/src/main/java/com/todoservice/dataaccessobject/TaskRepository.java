package com.todoservice.dataaccessobject;

import org.springframework.data.repository.CrudRepository;

import com.todoservice.domainobject.TaskDO;

/**
 * Database Access Object for Task table.
 * <p/>
 */
public interface TaskRepository extends CrudRepository<TaskDO, Long>
{
 
}
