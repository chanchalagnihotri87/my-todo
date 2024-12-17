class Problem {
  id: number;
  text: string;
  lifeAreaId: number;
  twentyPercent: boolean;
  completed: boolean;
  index: number;
  plan: string = "";

  constructor(
    id: number,
    text: string,
    lifeAreaId: number,
    twentyPercent: boolean = false,
    completed: boolean = false
  ) {
    this.id = id;
    this.index = id;
    this.text = text;
    this.lifeAreaId = lifeAreaId;
    this.twentyPercent = twentyPercent;
    this.completed = completed;
  }
}

export default Problem;
