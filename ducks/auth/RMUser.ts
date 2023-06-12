export interface RMUser {
  userid: number;
  package_id: number;
  user_RM_ID: string;
  user_status: "R" | "1" | "2" | "3" | "4" | "5" | "P" | "B" | "S" | "M"; //R < 1 < 2 < 3 < 4 < 5 < P and P is everything
  package_enddate: string | null;
  privacy_show_name: "P" | "I";
  privacy_show_photo: "P" | "I";
  privacy_show_contact: "P" | "I";
}
