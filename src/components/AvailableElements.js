import Section from './Section';
import Board from './Board';
import Task from './Task';

const availableElements = [Section, Board, Task];

export default availableElements.reduce(
  (acc, fn) => ({ ...acc, [fn.name]: fn }),
  {}
);
