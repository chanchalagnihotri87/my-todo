class Goal {
  id: number;
  text: string;
  problemId: number;
  twentyPercent: boolean;
  completed: boolean;
  index: number;
  plan: string = "";

  constructor(
    id: number,
    text: string,
    problemId: number,
    twentyPercent: boolean = false,
    completed: boolean = false
  ) {
    this.id = id;
    this.index = id;
    this.text = text;
    this.problemId = problemId;
    this.twentyPercent = twentyPercent;
    this.completed = completed;
  }
}

export default Goal;
