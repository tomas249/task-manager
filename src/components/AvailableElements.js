import Section from "./Section";
import Board from "./Board";
import Task from "./Task";

// const availableElements = [Section, Board, Task];
// export const Element = availableElements.reduce((acc, fn) => ({ ...acc, [fn.name]: fn }), {});
// export const availableTypes = availableElements.map((fn) => fn.name);

export const Element = {
  Section,
  Board,
  Task,
};
export const availableTypes = Object.keys(Element);

export const newElementForm = {
  Section: [{ name: "title", label: "Title", type: "text", required: true }],
  Board: [{ name: "title", label: "Title", type: "text", required: true }],
  Task: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "url", label: "Url", type: "text", required: false },
    { name: "endDate", label: "End date", type: "date", required: false },
  ],
};
