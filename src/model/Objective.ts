class Objective {
  id: number;
  text: string;
  goalId: number;
  twentyPercent: boolean;
  completed: boolean;
  index: number;
  plan: string = "";

  constructor(
    id: number,
    text: string,
    goalId: number,
    twentyPercent: boolean = false,
    completed: boolean = false
  ) {
    this.id = id;
    this.index = id;
    this.text = text;
    this.goalId = goalId;
    this.twentyPercent = twentyPercent;
    this.completed = completed;
  }
}

export default Objective;
