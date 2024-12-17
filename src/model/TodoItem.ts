class TodoItem {
  id: number;
  text: string;
  taskId: number;
  twentyPercent: boolean;
  completed: boolean;
  index: number;
  sprintId?: number;
  date?: Date;

  constructor(
    id: number,
    text: string,
    taskId: number,
    twentyPercent: boolean = false,
    completed: boolean = false,
    sprintId: number | undefined = undefined
  ) {
    this.id = id;
    this.index = id;
    this.text = text;
    this.taskId = taskId;
    this.twentyPercent = twentyPercent;
    this.completed = completed;
    this.sprintId = sprintId;
  }
}

export default TodoItem;
