class Task {
  id: number;
  text: string;
  objectiveId: number;
  twentyPercent: boolean;
  completed: boolean;
  index: number;

  constructor(
    id: number,
    text: string,
    objectiveId: number,
    twentyPercent: boolean = false,
    completed: boolean = false
  ) {
    this.id = id;
    this.index = id;
    this.text = text;
    this.objectiveId = objectiveId;
    this.twentyPercent = twentyPercent;
    this.completed = completed;
  }
}

export default Task;
