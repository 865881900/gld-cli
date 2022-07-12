import {NewPackageManager} from '../type';

export interface CreateOption{
  newPackageManager: NewPackageManager
  force: boolean
  merge: boolean
  gitPath?: string
}
