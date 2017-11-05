package com.todoservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Task name is already in use")
public class TaskAlreadyInUseException extends Exception
{
    static final long serialVersionUID = -3387516993334229948L;

    public TaskAlreadyInUseException(String message)
    {
        super(message);
    }

}
