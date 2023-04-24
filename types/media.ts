export default interface Media {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "File" | "Folder";
  parent: string | null;
  creator: string;
  authorizedUsers: string[];
  createdAt: Date;
}
