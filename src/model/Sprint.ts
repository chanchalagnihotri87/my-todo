class Sprint {
  id: number;
  text: string;
  completed: boolean;
  startDate: Date;
  endDate: Date;
  todoItemIds: number[] = [];

  constructor(
    id: number,
    text: string,
    startDate: Date,
    endDate: Date,
    completed: boolean = false,
    todoItemIds: number[] = []
  ) {
    this.id = id;
    this.text = text;
    this.startDate = startDate;
    this.endDate = endDate;
    this.completed = completed;
    this.todoItemIds = todoItemIds;
  }
}

export default Sprint;
