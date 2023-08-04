export type User = {
  id: string | null | undefined;
  displayName: string | null | undefined;
  email: string | null | undefined;
  createdAt: number;
  updatedAt: number;
  likedProblems: string[];
  dislikedProblems: string[];
  solvedProblems: string[];
  starredProblems: string[];
  fontSize: string;
};
