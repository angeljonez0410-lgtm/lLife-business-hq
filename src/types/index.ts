export type TaskStatus = "Not Started" | "Doing" | "Done";
export type TaskType = "Money" | "Content" | "Learning" | "Admin" | "Build";
export type Priority = "High" | "Medium" | "Low";

export type Business = {
  id: string;
  name: string;
  icon: string;
  color: string;
  status: string;
  stage: "Idea" | "Learning" | "Building" | "Testing" | "Selling" | "Scaling";
  mainGoal: string;
  nextTask: string;
  progress: number;
  currentFocus: string;
  blocker: string;
  lastUpdated: string;
  notes: string;
  moneyPotential: "Fast Cash" | "Long Term" | "Build Slowly";
};

export type Task = {
  id: string;
  title: string;
  business: string;
  type: TaskType;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
  notes: string;
};

export type ContentIdea = {
  id: string;
  title: string;
  platform: "TikTok" | "Instagram" | "Facebook" | "YouTube Shorts" | "Pinterest";
  business: string;
  status: "Idea" | "Filmed" | "Edited" | "Posted";
  hook: string;
  caption: string;
  hashtags: string;
  postDate: string;
  notes: string;
};

export type MoneyEntry = {
  id: string;
  date: string;
  business: string;
  amount: number;
  type: "Income" | "Expense";
  category: string;
  notes: string;
};

export type Product = {
  id: string;
  productName: string;
  business: string;
  cost: number;
  sellingPrice: number;
  platform: string;
  status: "Research" | "Bought" | "Listed" | "Sold";
  supplier: string;
  notes: string;
};

export type LearningPath = {
  business: string;
  whatToLearnFirst: string[];
  doThisFirst: string;
  beginnerChecklist: string[];
  buildStepByStep: string[];
  commonMistakes: string[];
  nextLevelSteps: string[];
  materials: string[];
  tools: string[];
  googleSearches: string[];
  youtubeSearches: string[];
  postIdeas: string[];
  videoIdeas: string[];
};

export type Settings = {
  profileName: string;
  theme: "Boss Pink" | "Black Gold" | "Soft Cream";
  moneyGoal: number;
  contentGoal: number;
  businessCategories: string;
};
