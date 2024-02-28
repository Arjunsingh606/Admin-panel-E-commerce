export interface FormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  id?: number | string
}

export interface LoginFormValues {
  email?: string;
  password?: string;
}

export interface ColorLable {
  label?: string;
  color?: string;
  Blogging?: string
  Working?: string,
  Personal?: string,
  Trading?: string,
  Technology?: string,
  Sports?: string,
  Travelling?: string
  Education?: string,
  Finance?: string,
  Politics?: string,
  id?: number
}
export interface NoteData {
  title?: string;
  label?: string;
  color?: string;
  date?: string;
  time?: string;
  creatByUserId?: string;
  textData?: string;
  id?: string;
}
export const labelColors = {
  Blogging: "#cb9c81",
  Working: "#85d5d0",
  Personal: "#ae8ae7",
  Trading: "#4a169b",
  Technology: "#357827",
  Sports: "#838d4a",
  Travelling: "#14cd14",
  Education: "#7c1c85",
  Finance: "#0664a1",
  Politics: "#c15d0f",
};

export const colorOptions: ColorLable[] = [
  { label: "Blogging", color: "rgba(255, 222, 203, 0.3" },
  { label: "Working", color: "rgba(133, 213, 208, .3)" },
  { label: "Personal", color: "rgba(233, 218, 255, .3)" },
  { label: "Trading", color: "rgba(182, 143, 243, .3" },
  { label: "Technology", color: "rgba(103, 185, 86, .3)" },
  { label: "Sports", color: "rgba(241, 251, 179, .3)" },
  { label: "Travelling", color: "rgba(12,177, 12, .3)" },
  { label: "Education", color: "rgba(221, 87, 233, .3)" },
  { label: "Finance", color: "rgba(73, 176, 243, .3)" },
  { label: "Politics", color: "rgba(243, 148, 73, .3)" },
];

export const initialNotesValues = {
  title: "Title" as string,
  changeInput: false as boolean,
  label: {} as ColorLable | undefined,
  noteText: "" as string,
  allNotes: [] as NoteData[],
  showEditor: false as boolean,
  searchNote: "" as string,
  selectedNote: null as NoteData | null,
  editNote: false as boolean,
  deletModal: false as boolean,
  noteId: "" as string,
}
