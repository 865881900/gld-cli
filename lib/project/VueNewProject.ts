import NewProject from './NewProject';

export default class VueNewProject extends NewProject {
  constructor(newProjectName: string, newProjectPath: string) {
    super(newProjectName, newProjectPath);
  }
}
