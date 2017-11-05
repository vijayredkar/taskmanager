package com.todoservice.controller.mapper;

import com.todoservice.datatransferobject.TaskDTO;
import com.todoservice.domainobject.TaskDO;

import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class TaskMapper
{
    public static TaskDO makeTaskDO(TaskDTO taskDTO)
    {
        return new TaskDO(taskDTO.getName(), taskDTO.getDesc(), taskDTO.getStatus(), ZonedDateTime.now(), ZonedDateTime.now());
    }

    public static TaskDTO makeTaskDTO(TaskDO taskDO)
    {
        TaskDTO.TaskDTOBuilder taskDTOBuilder = TaskDTO.newBuilder()
											            .setId(taskDO.getId())
											            .setName(taskDO.getName())
											            .setDesc(taskDO.getDesc())
											            .setStatus(taskDO.getStatus());
        return taskDTOBuilder.createTaskDTO();
    }

    public static List<TaskDTO> makeTaskDTOList(Collection<TaskDO> tasks)
    {
        return tasks.stream()
            .map(TaskMapper::makeTaskDTO)
            .collect(Collectors.toList());
    }
}