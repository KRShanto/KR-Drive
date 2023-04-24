export default interface Media {
  id: string;
  title: string;
  description: string;
  url: string;
  type:
    | "TXT"
    | "PDF"
    | "JPG"
    | "PNG"
    | "MP4"
    | "MP3"
    | "WAV"
    | "FOLDER"
    | "OTHER";
  parent: string | null;
  creator: string;
  authorizedUsers: string[];
  createdAt: Date;
}
