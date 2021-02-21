import Section from "./Section";
import Board from "./Board";
import Task from "./Task";

const availableElements = [Section, Board, Task];

export const Element = availableElements.reduce((acc, fn) => ({ ...acc, [fn.name]: fn }), {});

export const availableTypes = availableElements.map((fn) => fn.name);
